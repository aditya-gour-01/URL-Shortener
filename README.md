🔗 URL Shortener with Authentication & Analytics

A full-stack URL Shortener application built using Node.js, Express, MongoDB, and EJS, designed with a clean MVC architecture and secure authentication/authorization.

This project allows authenticated users to generate shortened URLs, track click analytics, and manage their links through a role-based system.


**🚀 Features**

**🔐 Authentication & Authorization**

1. Stateless authentication using JWT (JSON Web Tokens).
  
2. Cookie-based login session.
  
3. Role-based access control:
  
        NORMAL users → Manage their own URLs.
    
        ADMIN users → View all users and URLs.
    
**🔗 URL Shortening**

1. Convert long URLs into unique short IDs.
  
2. Automatic redirect to original link.
  
**📊 Analytics Tracking**

1. Record every visit timestamp.

2. View total clicks and visit history.

**🧱 Clean Backend Architecture**

1. MVC structure (Model–View–Controller).

2. Middleware-based request pipeline.

3. Separation of concerns.

**🖥️ Server-side Rendering**

1. EJS templates for dashboard and forms.



**🛠️ Tech Stack**

**Backend**

Node.js

Express.js

**Database**

MongoDB

Mongoose ODM

**Authentication**

JSON Web Tokens (JWT)

Cookie Parser

**Utilities**

shortid (unique URL ID generation)

dotenv (environment configuration)

**View Engine**

EJS



**🧩 Software Architecture**

This project follows a structured MVC pattern:

<img width="259" height="172" alt="image" src="https://github.com/user-attachments/assets/c0c0c0d6-ad03-4566-b7df-526d7e4caa82" />


**📂 Project Structure**

<img width="348" height="323" alt="image" src="https://github.com/user-attachments/assets/f4b88290-f63b-4a03-beca-f77f178ae1e5" />


**🔐 Authentication Flow (Technical)**

**Signup**

1. User submits signup form.

2. Server creates user document in MongoDB.

        POST /user

**Login**

1. User submits credentials.
        
2. Server validates user.
        
3. JWT token generated.
        
4. Token stored inside browser cookie.

        POST /user/login

**Every Request**

Global middleware runs:

        checkForAuthentication

This:

1. Reads cookie

2. Verifies JWT

3. Attaches user data to:

        req.user

**Authorization**

Routes use:
        restrictTo(["ROLE"})

Example:

        NORMAL → access dashboard
        
        ADMIN → access admin panel

        

**🔗 URL Shortening Flow**

**Create Short URL**

        POST /url

Process:

1. Authenticated user submits URL.

2. Server generates unique short ID.

3. Stores:

        {
         shortId,
         redirectURL,
         createdBy,
         visitHistory
        }

**Example**

Input:

        https://example.com/very-long-link

Output:

        http://localhost:8001/url/XyZ123



**🌐 Redirection Flow**

When visting:
        GET /url/:shortId

Server:

1. Finds matching URL.

2. Adds timestamp to analytics.

3. Redirects to original URL.

   

**📊 Analytics Example**
GET /url/analytics/xyz123

Response:

        {
          "totalClicks": 5,
          "analytics": [
            { "timestamp": 1700000000 }
          ]
        }

**👑 Admin Features**

Admin users can:
        GET /admin/urls

View:

1. All URLs

2. All users

3. Ownership mapping

**⚙️ Environment Setup (.env)**

Create .env file:

        PORT=8001
        
        MONGO_URI=mongodb://localhost:27017/short-URL
        
        JWT_SECRET=your_secret_key

**🧪 Run Locally**

**1️⃣ Clone Repository**

git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

cd YOUR_REPO

**2️⃣ Install Dependencies**

npm install

**3️⃣ Configure Environment**

Configure/create the .env file 

**4️⃣ Start MongoDB**

Make sure MongoDB is running locally.

**5️⃣ Run Server**

node index.js

Server:

http://localhost:8001

**🔄 Example Workflow**

1. Visit
        /signup
Create Account

2. Login
        /login

3. Dashboard loads:
        /

4. Create short URL.
   
5. Visit
        /url/{shortId}
Redirect + analytics recorded.

**🔒 Security Design**

1. Stateless JWT authentication.

2. Cookie-based session management.

3. Role-based authorization middleware.

4. Environment-based secret management (.env).

**🤝 Contribution**

Contributions welcome!

1. Fork repository

2. Create feature branch

3. Submit PR

**⭐ Future Improvements**

1. Password hashing (bcrypt)

2. Rate limiting

3. Custom short aliases

4. URL expiration

5. API documentation (Swagger)




