import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

/** Integration test: requires migrated + seeded PostgreSQL (see CI workflow). */
describe('Public portfolio API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('provides DB-aware readiness', async () => {
    await request(app.getHttpServer()).get('/health').expect(200).expect({ status: 'ok' });
  });

  it('serves the exact requested nested data without GraphQL errors', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query ProfileForInterview {
            profile {
              name
              description
              skills { name }
              experience { company position duration achievements }
              projects { name url }
              links { label url }
            }
          }
        `,
      })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.profile.name).toBeTruthy();
    expect(response.body.data.profile.skills.length).toBeGreaterThan(0);
    expect(response.body.data.profile.experience.length).toBeGreaterThan(0);
    expect(response.body.data.profile.projects.length).toBeGreaterThan(0);
    expect(response.body.data.profile.links.length).toBeGreaterThan(0);
  });

  it('supports a narrow profile selection', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ profile { name } }' })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    expect(Object.keys(response.body.data.profile)).toEqual(['name']);
  });
});
