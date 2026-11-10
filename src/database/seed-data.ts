/**
 * PERSONALIZE THIS FILE BEFORE SUBMITTING THE ASSIGNMENT.
 * The examples below are intentionally obvious placeholders, NOT a claim
 * about any actual person's employment or shipped projects.
 */
export const PUBLIC_PROFILE_ID = 'public';

export const seedProfile = {
  name: 'Виктор Ко',
  headline: 'Старший Backend-разработчик | TypeScript, Node.js, NestJS, PostgreSQL, Prisma, GraphQL, Docker | 6 лет опыта в разработке серверных приложений',
  description:
    'Опытный Backend-разработчик с более чем 6-летним опытом разработки масштабируемых серверных приложений, REST API, микросервисов и распределённых систем. Специализируюсь на TypeScript, Node.js, Python, Java, Spring Boot, PostgreSQL и Docker. Имею опыт проектирования архитектуры приложений, оптимизации SQL-запросов, интеграции внешних сервисов и разработки высоконагруженных систем. Работал над платформами электронной коммерции, системами мониторинга, AI-решениями и обработкой больших данных. Развиваю экспертизу в NestJS, Prisma и GraphQL. Уделяю особое внимание качеству кода, производительности, безопасности и поддерживаемости программных решений.',
  location: 'Владивосток, Россия',
};

export const seedLinks = [
  { id: 'link-github', label: 'GitHub', url: 'https://github.com/BARC1999', sortOrder: 10 },
];

export const seedSkills = [
  { id: 'skill-typescript', name: 'TypeScript', category: 'Language', sortOrder: 10 },
  { id: 'skill-node', name: 'Node.js', category: 'Runtime', sortOrder: 20 },
  { id: 'skill-nest', name: 'NestJS', category: 'Framework', sortOrder: 30 },
  { id: 'skill-graphql', name: 'GraphQL', category: 'API', sortOrder: 40 },
  { id: 'skill-prisma', name: 'Prisma', category: 'ORM', sortOrder: 50 },
  { id: 'skill-postgres', name: 'PostgreSQL', category: 'Database', sortOrder: 60 },
  { id: 'skill-docker', name: 'Docker', category: 'Tooling', sortOrder: 70 },
  { id: 'skill-git', name: 'Git', category: 'Tooling', sortOrder: 80 },
];

export const seedExperience = [
  {
    id: 'experience-saigon-senior-backend',
    company: 'Saigon Technology',
    position: 'Старший Backend-разработчик (Python / Java)',
    startDate: new Date('2023-04-01T00:00:00.000Z'),
    endDate: new Date('2026-08-31T00:00:00.000Z'),
    summary:
      'Разработка и поддержка масштабируемых backend-систем, ' +
      'микросервисов, распределённых платформ и AI-приложений. ' +
      'Проектирование архитектуры, интеграция сервисов, ' +
      'обработка больших данных и оптимизация производительности. ' +
      'Основные технологии: Python, Java, Spring Boot, PostgreSQL, ' +
      'Kafka, RabbitMQ, Docker, Kubernetes и Elasticsearch.',
    achievements: [
      'Разработал RAG-систему с использованием Parent-Child Chunking, ' +
        'Hybrid Search, Reranking и Ragas для повышения точности ' +
        'и надёжности ответов на клиентские запросы.',

      'Реализовал конвейеры обработки образовательных данных ' +
        'с валидацией, дедупликацией и централизованной интеграцией. ' +
        'Использовал PydanticAI для автоматизации обработки данных ' +
        'и подготовки BI-отчётности.',

      'Разработал распределённую систему мониторинга логов и узлов ' +
        'на Python, Kafka, Fluentd, RabbitMQ и Elasticsearch ' +
        'с обнаружением сбоев через Heartbeat и отслеживанием аномалий.',

      'Создал sparkSential — систему обнаружения мошенничества ' +
        'с использованием PySpark, Kafka, XGBoost и TensorFlow. ' +
        'Реализовал ML-конвейеры и контейнеризированные микросервисы ' +
        'для инференса моделей с Docker и Kubernetes.',

      'Разработал coginirepo — MCP-сервер для AI-агентов ' +
        'на Python, FAISS и ChromaDB с семантическим и гибридным поиском, ' +
        'графами знаний и извлечением контекста для LLM.',

      'В команде из двух разработчиков создал VibraCoach — ' +
        'BLE-систему тактильной обратной связи с интеграцией ' +
        'Android-приложения, ESP32-C3 и управляемых вибрационных сигналов.',

      'Разработал MovieInfo — Android-приложение для поиска фильмов ' +
        'на Kotlin, Jetpack Compose, Retrofit2 и Gson ' +
        'с интеграцией внешнего REST API.',
    ],
    sortOrder: 10,
  },
  {
    id: 'experience-saigon-fullstack',
    company: 'Saigon Technology',
    position: 'Фулстек-разработчик (Backend / Node.js / Java)',
    startDate: new Date('2020-09-01T00:00:00.000Z'),
    endDate: new Date('2023-04-30T00:00:00.000Z'),
    summary:
      'Разработка серверной и клиентской частей веб-приложений, ' +
      'проектирование REST API, реализация бизнес-логики, ' +
      'аутентификации и авторизации, интеграция с базами данных. ' +
      'Основные технологии: Java, Node.js, Spring Boot, ' +
      'Spring Security, Hibernate, JPA, MySQL, React, Docker и Git.',
    achievements: [
      'Участвовал в разработке ICE E-Shop — платформы электронной ' +
        'коммерции на Java, Spring Boot, Hibernate/JPA, MySQL, ' +
        'React и Docker в команде из двух разработчиков.',

      'Реализовал серверную бизнес-логику интернет-магазина, ' +
        'включая каталоги товаров, фильтрацию, корзину покупок ' +
        'и историю заказов с использованием REST API.',

      'Внедрил JWT-аутентификацию и авторизацию на основе ' +
        'Spring Security, обеспечив безопасное взаимодействие ' +
        'между клиентской и серверной частями приложения.',

      'Спроектировал реляционную модель данных и слой доступа ' +
        'к базе данных с использованием MySQL, Hibernate ' +
        'и Spring Data JPA.',

      'Документировал REST API с помощью Swagger/OpenAPI, ' +
        'контейнеризировал компоненты приложения с Docker ' +
        'и упростил процессы тестирования и развёртывания.',

      'Применял многоуровневую архитектуру для разделения ' +
        'бизнес-логики, контроллеров и компонентов доступа к данным, ' +
        'повышая читаемость и поддерживаемость кодовой базы.',
    ],
    sortOrder: 20,
  },
];

export const seedProjects = [
  {
    id: 'project-rag-system',
    name: 'RAG-система обработки клиентских запросов',
    description:
      'Разработал интеллектуальную систему обработки ' +
      'клиентских запросов на основе Retrieval-Augmented Generation. ' +
      'Реализовал Parent-Child Chunking, Hybrid Search ' +
      'и Reranking для повышения релевантности поиска. ' +
      'Использовал Ragas для оценки качества ' +
      'и надёжности генерируемых ответов.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Python',
      'RAG',
      'LLM',
      'Hybrid Search',
      'Reranking',
      'Ragas',
    ],
    sortOrder: 20,
  },
  {
    id: 'project-education-data',
    name: 'Платформа обработки образовательных данных',
    description:
      'Разработал конвейеры обработки образовательных данных ' +
      'с автоматической валидацией, дедупликацией ' +
      'и централизованной интеграцией. ' +
      'Использовал PydanticAI для автоматизации обработки ' +
      'информации и подготовки данных для BI-отчётности.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Python',
      'PydanticAI',
      'Data Processing',
      'Data Validation',
      'ETL',
      'BI',
    ],
    sortOrder: 30,
  },
  {
    id: 'project-monitoring',
    name: 'Распределённая система мониторинга',
    description:
      'Разработал распределённую систему мониторинга ' +
      'серверных узлов и логов. Реализовал сбор и обработку ' +
      'событий с использованием Kafka, RabbitMQ, Fluentd ' +
      'и Elasticsearch. Внедрил механизм Heartbeat ' +
      'для обнаружения сбоев и отслеживание аномалий ' +
      'в NoSQL-хранилище. Контейнеризировал сервисы с Docker.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Python',
      'Apache Kafka',
      'RabbitMQ',
      'Fluentd',
      'Elasticsearch',
      'NoSQL',
      'Docker',
    ],
    sortOrder: 40,
  },
  {
    id: 'project-sparksential',
    name: 'sparkSential — система обнаружения мошенничества',
    description:
      'Разработал распределённую систему обнаружения ' +
      'мошеннических операций с использованием PySpark ' +
      'и Apache Kafka. Реализовал ML-конвейеры на основе ' +
      'XGBoost и TensorFlow, а также микросервисы ' +
      'для инференса моделей. Обеспечил контейнеризацию ' +
      'и оркестрацию сервисов с Docker и Kubernetes.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Python',
      'PySpark',
      'Apache Kafka',
      'XGBoost',
      'TensorFlow',
      'Docker',
      'Kubernetes',
      'Machine Learning',
    ],
    sortOrder: 50,
  },
  {
    id: 'project-coginirepo',
    name: 'coginirepo — MCP-сервер для AI-агентов',
    description:
      'Разработал MCP-сервер для AI-агентов, ' +
      'обеспечивающий интеллектуальный поиск ' +
      'и извлечение контекста для больших языковых моделей. ' +
      'Реализовал семантический и гибридный поиск ' +
      'с использованием FAISS и ChromaDB, ' +
      'а также интеграцию графов знаний.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Python',
      'MCP',
      'FAISS',
      'ChromaDB',
      'LLM',
      'Vector Search',
      'Knowledge Graph',
    ],
    sortOrder: 60,
  },
  {
    id: 'project-vibracoach',
    name: 'VibraCoach — система тактильной обратной связи',
    description:
      'В команде из двух разработчиков создал систему ' +
      'тактильной обратной связи на основе Bluetooth Low Energy. ' +
      'Интегрировал Android-приложение с микроконтроллером ' +
      'ESP32-C3 и реализовал управление вибрационными ' +
      'сигналами для взаимодействия с пользователем.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Android',
      'Bluetooth Low Energy',
      'BLE',
      'ESP32-C3',
      'IoT',
    ],
    sortOrder: 70,
  },
  {
    id: 'project-movieinfo',
    name: 'MovieInfo — Android-приложение для поиска фильмов',
    description:
      'Разработал Android-приложение для поиска ' +
      'и просмотра информации о фильмах. ' +
      'Реализовал современный пользовательский интерфейс ' +
      'с Jetpack Compose, интеграцию внешнего REST API ' +
      'через Retrofit2 и обработку JSON-данных с Gson.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Kotlin',
      'Android',
      'Jetpack Compose',
      'Retrofit2',
      'Gson',
      'REST API',
    ],
    sortOrder: 80,
  },
  {
    id: 'project-ice-eshop',
    name: 'ICE E-Shop — платформа электронной коммерции',
    description:
      'В команде из двух разработчиков участвовал ' +
      'в создании full-stack платформы электронной коммерции. ' +
      'Разработал серверную бизнес-логику каталогов товаров, ' +
      'фильтрации, корзины и истории заказов. ' +
      'Реализовал REST API, JWT-аутентификацию ' +
      'и авторизацию через Spring Security. ' +
      'Использовал Hibernate/JPA для работы с MySQL, ' +
      'Swagger/OpenAPI для документации API ' +
      'и Docker для контейнеризации приложения.',
    url: '',
    repositoryUrl: null,
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Hibernate',
      'JPA',
      'MySQL',
      'React',
      'REST API',
      'JWT',
      'Swagger',
      'Docker',
    ],
    sortOrder: 90,
  },
];