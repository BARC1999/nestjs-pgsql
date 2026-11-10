import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { ProfileLoaders } from './profile/loaders/profile.loaders';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [
    DatabaseModule,
    ProfileModule,
    HealthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ProfileModule],
      inject: [ProfileService],
      useFactory: (service: ProfileService): ApolloDriverConfig => ({
        driver: ApolloDriver,
        path: '/graphql',
        autoSchemaFile: true,
        sortSchema: true,
        graphiql: false,
        introspection: true, // Intentional for a public, read-only demo API.
        csrfPrevention: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        // DO NOT reuse a loader across requests: cached data must be request-local.
        context: () => ({ loaders: new ProfileLoaders(service) }),
      }),
    }),
  ],
})
export class AppModule {}
