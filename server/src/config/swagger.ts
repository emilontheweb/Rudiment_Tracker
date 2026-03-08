import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rudiment Practice Tracker API",
      version: "1.0.0",
      description: "API for tracking drum rudiment practice sessions"
    },
    components: {
      schemas: {
        Rudiment: {
          type: "object",
          required: ["_id", "name", "bpm", "createdAt", "updatedAt"],
          properties: {
            _id: {
              type: "string",
              example: "64f2a3c9d1b3e2a1c8e12345"
            },
            name: {
              type: "string",
              example: "Paradiddle"
            },
            bpm: {
              type: "number",
              example: 120
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },

        PracticeSession: {
          type: "object",
          required: ["_id", "rudimentId", "bpm", "durationInMinutes", "createdAt"],
          properties: {
            _id: {
              type: "string"
            },
            rudimentId: {
              type: "string",
              example: "64f2a3c9d1b3e2a1c8e12345"
            },
            bpm: {
              type: "number",
              example: 120
            },
            durationInMinutes: {
              type: "number",
              example: 15
            },
            notes: {
              type: "string",
              example: "Felt smooth today"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            }
          }
        },

        SummaryStats: {
          type: "object",
          required: ["totalSessions", "totalPracticeMinutes", "averageBpm"],
          properties: {
            totalSessions: {
              type: "number",
              example: 12
            },
            totalPracticeMinutes: {
              type: "number",
              example: 340
            },
            averageBpm: {
              type: "number",
              example: 118
            }
          }
        },

        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Validation error"
            }
          }
        }

      }
    }
  },
  apis: ["src/routes/*.ts"]
}

export const swaggerSpec = swaggerJsdoc(options)