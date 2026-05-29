# 🖥️ Laptop E-Commerce System

A full-stack, production-ready e-commerce platform for buying and selling laptops, built with Node.js, Express, TypeScript, and MySQL.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)

---

## 🌟 Features

### 👤 User Management
- **User Registration & Authentication** - Secure signup with comprehensive password validation
- **Login System** - Passport.js-based authentication with session persistence
- **Role-Based Access Control** - Admin and User roles with different permissions
- **User Profiles** - Full profile management with avatar upload
- **Account Types** - Support for system and custom account types

### 🛍️ Shopping Experience
- **Product Browsing** - Browse all available laptops with detailed information
- **Shopping Cart** - Add/remove products with real-time price calculations
- **Checkout Process** - Complete checkout flow with order review
- **Order Placement** - Place orders with receiver details
- **Thank You Page** - Order confirmation with details

### 📦 Product Management (Admin)
- **CRUD Operations** - Create, read, update, delete products
- **Product Details** - Store name, price, description, quantity, factory, target
- **Image Upload** - Upload product images with file management
- **Inventory Tracking** - Monitor stock levels and sold count
- **Product Search** - Find and filter products in admin panel

### 📊 Admin Dashboard
- **User Management** - View, create, edit, delete users
- **Product Management** - Manage entire product catalog
- **Order Monitoring** - Track all orders and their status
- **Dashboard Overview** - Quick statistics and summaries

### 💳 Order Management
- **Order Status Tracking** - PENDING, CANCELED, COMPLETE
- **Payment Methods** - Support for COD (Cash on Delivery) and Banking
- **Payment Status** - Track UNPAID, SUCCEEDED, FAILED states
- **Order History** - View past orders with details
- **Order Details** - Store price snapshots at time of purchase

### 🔐 Security Features
- **Password Hashing** - bcrypt with 10 salt rounds
- **Input Validation** - Comprehensive data validation with Zod
- **Session Security** - Secure session storage in database
- **File Upload Validation** - Type and size validation for uploads
- **CSRF Protection** - Session-based authentication
- **SQL Injection Prevention** - Prisma ORM parameterized queries

---

## 📋 Tech Stack

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js 5.0.1
- **ORM:** Prisma 6.3.0
- **Authentication:** Passport.js with Local Strategy
- **Session Store:** Prisma Session Store with express-session

### Database
- **Database:** MySQL
- **Client:** mysql2 3.12.0

### File Handling & Validation
- **File Upload:** Multer 1.4.5-lts.1
- **Data Validation:** Zod 3.24.2
- **UUID Generation:** uuid 11.0.5

### Frontend
- **Template Engine:** EJS 3.1.10

### Security
- **Password Hashing:** bcrypt 5.1.1
- **Environment Variables:** dotenv 16.4.7

### Development
- **Task Runner:** Nodemon 3.1.9
- **TypeScript Compiler:** ts-node 10.9.2
- **Path Aliases:** tsconfig-paths 4.2.0
- **Compiler:** TypeScript 5.7.3

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/khahly127/nodejs-pro-aura.git
cd nodejs-pro-aura
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
DATABASE_URL="mysql://username:password@localhost:3306/laptop_ecommerce"
PORT=3000
NODE_ENV=development
```

4. **Set up database**
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE laptop_ecommerce;"

# Run Prisma migrations
npx prisma migrate deploy

# Seed database with initial data
npx prisma db seed
```

5. **Start development server**
```bash
npm run dev
```

Server will be running at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── config/               # Configuration files
│   ├── client.ts        # Prisma client
│   ├── constant.ts      # Constants
│   └── seed.ts          # Database seeding
├── controllers/         # Request handlers
│   ├── admin/           # Admin controllers
│   │   ├── dashboard.controller.ts
│   │   └── product.controller.ts
│   ├── client/          # Client controllers
│   │   ├── api.controller.ts
│   │   ├── auth.controller.ts
│   │   └── product.controller.ts
│   └── user.controller.ts
├── middleware/          # Custom middleware
│   ├── auth.ts         # Authentication middleware
│   ├── multer.ts       # File upload configuration
│   └── passport.local.ts # Passport.js configuration
├── routes/             # Route definitions
│   ├── api.ts         # API routes
│   └── web.ts         # Web routes
├── services/          # Business logic
│   ├── admin/
│   ├── client/
│   └── user-service.ts
├── types/             # TypeScript type definitions
├── validation/        # Zod validation schemas
│   ├── register.schema.ts
│   └── user.schema.ts
└── views/             # EJS templates
    ├── client/
    ├── admin/
    └── status/

prisma/
├── schema.prisma      # Prisma schema definition
└── migrations/        # Database migrations

public/               # Static files
├── css/
├── js/
└── images/

```

---

## 🔌 API Endpoints

### User API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |
| POST | `/api/users` | Create new user | Yes |

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/register` | Registration page |
| POST | `/register` | Create new account |
| POST | `/logout` | Logout user |

### Product Routes (Client)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Home page | No |
| GET | `/product/:id` | Product details | No |
| GET | `/cart` | View cart | Yes |
| POST | `/add-product-to-cart/:id` | Add to cart | Yes |
| POST | `/delete-product-in-cart/:id` | Remove from cart | Yes |
| GET | `/checkout` | Checkout page | Yes |
| POST | `/handle-cart-to-checkout` | Prepare checkout | Yes |
| POST | `/place-order` | Create order | Yes |
| GET | `/thank` | Thank you page | Yes |

### Admin Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin` | Dashboard | Admin |
| GET | `/admin/user` | User list | Admin |
| GET | `/admin/create-user` | Create user form | Admin |
| POST | `/admin/handle-create-user` | Save new user | Admin |
| GET | `/admin/view-user/:id` | Edit user | Admin |
| POST | `/admin/update-user` | Update user | Admin |
| POST | `/admin/delete-user/:id` | Delete user | Admin |
| GET | `/admin/product` | Product list | Admin |
| GET | `/admin/create-product` | Create product form | Admin |
| POST | `/admin/create-product` | Save new product | Admin |
| GET | `/admin/view-product/:id` | Edit product | Admin |
| POST | `/admin/update-product` | Update product | Admin |
| POST | `/admin/delete-product/:id` | Delete product | Admin |
| GET | `/admin/order` | Order list | Admin |

---

## 🗄️ Database Schema

### Tables Overview

#### **users**
```sql
- id (INT, Primary Key, Auto Increment)
- username (VARCHAR 255, Unique)
- password (VARCHAR 255)
- fullName (VARCHAR 255, Optional)
- address (VARCHAR 255, Optional)
- phone (VARCHAR 255, Optional)
- accountType (VARCHAR 255)
- avatar (VARCHAR 255, Optional)
- roleId (INT, Foreign Key → roles)
```

#### **roles**
```sql
- id (INT, Primary Key, Auto Increment)
- name (VARCHAR 255, Unique)
- description (VARCHAR 255, Optional)
```

#### **products**
```sql
- id (INT, Primary Key, Auto Increment)
- name (VARCHAR 255)
- price (INT)
- image (VARCHAR 255, Optional)
- detailDesc (MediumText)
- shortDesc (VARCHAR 255)
- quantity (INT)
- sold (INT, Default: 0)
- factory (VARCHAR 255)
- target (VARCHAR 255)
```

#### **carts**
```sql
- id (INT, Primary Key, Auto Increment)
- sum (INT)
- userId (INT, Unique, Foreign Key → users)
```

#### **cart_detail**
```sql
- id (INT, Primary Key, Auto Increment)
- price (INT)
- quantity (INT)
- cartId (INT, Foreign Key → carts)
- productId (INT, Foreign Key → products)
```

#### **orders**
```sql
- id (INT, Primary Key, Auto Increment)
- totalPrice (INT)
- receiverAddress (VARCHAR 255)
- receiverName (VARCHAR 255)
- receiverPhone (VARCHAR 255)
- status (VARCHAR, Default: "PENDING")
- paymentMethod (VARCHAR)
- paymentStatus (VARCHAR)
- paymentRef (VARCHAR, Optional)
- userId (INT, Unique, Foreign Key → users)
```

#### **order_detail**
```sql
- id (INT, Primary Key, Auto Increment)
- price (INT)
- quantity (INT)
- orderId (INT, Foreign Key → orders)
- productId (INT, Foreign Key → products)
```

#### **sessions**
```sql
- id (VARCHAR, Primary Key)
- sid (VARCHAR, Unique)
- data (MediumText)
- expiresAt (DateTime)
```

---

## 🧪 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Start development server with debugging
npm run start:debug

# Build TypeScript to JavaScript
npm run build

# Run application
npm start

# Generate Prisma Client
npx prisma generate

# Create database migrations
npx prisma migrate dev --name <migration_name>

# View database with Prisma Studio
npx prisma studio

# Seed database
npx prisma db seed
```

---

## 🔐 Authentication Flow

1. **Registration**
   - User submits form with fullName, email, password, confirmPassword
   - Zod validation schema checks:
     - Password strength (min 6, uppercase, lowercase, number, special char)
     - Email format and uniqueness
     - Password confirmation match
   - Password hashed with bcrypt (10 rounds)
   - User created in database with User role

2. **Login**
   - User submits username and password
   - Passport Local Strategy verifies credentials
   - Password compared using bcrypt.compare()
   - User serialized into session
   - Session stored in MySQL

3. **Session Persistence**
   - On each request, Passport deserializes user from session
   - User enriched with role information from database
   - Cart sum calculated and attached to user object
   - User available in all views via `res.locals.user`

4. **Logout**
   - Session destroyed via `req.logout()`
   - User redirected to home page

---

## 📝 Data Validation

### Registration Schema
```typescript
- fullName: String (required, min 1 char)
- email: Email (valid format, must not exist)
- password: String (6+ chars, uppercase, lowercase, number, special char)
- confirmPassword: String (must match password)
```

### User Schema
```typescript
- fullName: String (required)
- email: String (email format, unique)
- address: String (optional)
- phone: String (optional)
- avatar: File (optional, image only)
- role: Integer (required, foreign key to roles)
```

---

## 🖼️ File Upload Configuration

### Avatar Upload
- Destination: `public/avatar/`
- File types: Image files only (jpg, jpeg, png)
- Max size: 5MB
- Naming: UUID-based naming

### Product Image Upload
- Destination: `public/image/product/`
- File types: Image files only (jpg, jpeg, png)
- Max size: 10MB
- Naming: UUID-based naming

---

## 🛠️ Troubleshooting

### Database Connection Issues
```
Error: Could not connect to database server
Solution: Check DATABASE_URL in .env and ensure MySQL is running
```

### Session Storage Errors
```
Error: PrismaClientKnownRequestError
Solution: Run 'npx prisma migrate deploy' to create session table
```

### File Upload Failures
```
Error: EACCES permission denied
Solution: Ensure public/avatar and public/image/product directories exist
```

### TypeScript Compilation Errors
```
Solution: Run 'npm install' to ensure all types are installed
```

---

## 🚀 Deployment

### Prerequisites for Production
- Node.js 18+ LTS
- MySQL 8.0+
- Environment variables configured
- Static files served efficiently
- HTTPS enabled

### Deployment Steps

1. **Build the application**
```bash
npm run build
```

2. **Set production environment**
```bash
export NODE_ENV=production
```

3. **Install production dependencies**
```bash
npm install --production
```

4. **Run migrations**
```bash
npx prisma migrate deploy
```

5. **Start the server**
```bash
npm start
```

### Recommended Hosting Platforms
- AWS EC2
- DigitalOcean
- Heroku
- Railway
- Vercel (backend)

---

## 📊 Performance Considerations

1. **Database Indexing** - Indexed username, email, and foreign keys
2. **Session Storage** - Database-backed sessions with cleanup
3. **File Uploads** - Efficient Multer configuration with size limits
4. **Query Optimization** - Prisma relations for efficient data fetching
5. **Caching** - Session-based cart sum caching

---

## 🔒 Security Best Practices

✅ Password hashing with bcrypt (10 rounds)
✅ Session-based authentication
✅ Role-based access control
✅ Input validation with Zod
✅ SQL injection prevention via Prisma ORM
✅ CSRF protection via session cookies
✅ File upload validation
✅ Environment variables for secrets
✅ Secure session configuration
✅ Password requirements enforcement

---

## 📈 Future Enhancements

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Product reviews and ratings
- [ ] Real-time notifications with WebSockets
- [ ] Advanced search and filtering
- [ ] Product recommendations engine
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Rate limiting and throttling
- [ ] Analytics dashboard
- [ ] Mobile app support

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Ly** - Full-Stack Developer

- GitHub: [@khahly127](https://github.com/khahly127)
- Email: [your-email@example.com]

---

## 📞 Support

For support, email support@example.com or open an issue on [GitHub Issues](https://github.com/khahly127/nodejs-pro-aura/issues).

---

## 🙏 Acknowledgments

- Express.js team for the fantastic web framework
- Prisma for the amazing ORM
- Passport.js for authentication
- All open-source contributors

---

**Last Updated:** May 29, 2024
**Status:** ✅ Production Ready
**Version:** 1.0.0

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Total Files | ~24 TypeScript files |
| Database Tables | 8 |
| API Endpoints | 20+ |
| Authentication Methods | Local (Passport.js) |
| Upload Types | Avatar, Product Image |
| Supported Roles | Admin, User |
| Session Storage | MySQL |

