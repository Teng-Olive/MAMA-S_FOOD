import { Sequelize } from 'sequelize';

// Create a Sequelize instance to connect to MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'food-stuffs',      // Database name
    process.env.DB_USER || 'root',            // MySQL username (default: root for XAMPP)
    process.env.DB_PASSWORD || '',            // MySQL password (default: empty for XAMPP)
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,                          // Set to console.log to see SQL queries
        define: {
            timestamps: true,  // Adds createdAt and updatedAt fields
            underscored: false, // Use camelCase instead of snake_case
        },
    }
);

// Test the connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✓ MySQL database connection established successfully');
        
        // Sync all models with the database (create tables if they don't exist)
        await sequelize.sync({ alter: false });
        console.log('✓ Database synchronized');
        
    } catch (error) {
        console.error('✗ Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

export { sequelize, connectDB };
