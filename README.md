**URL Shortener 🔗**

This is a simple URL Shortener service built with Node.js, Express, and MongoDB.
It allows users to generate short links for long URLs, keep track of usage analytics, and redirect users to the original URL.

**🚀 Features**

**Shorten URLs** – Convert long links into short, easy-to-share IDs.

**Redirection** – Visiting the short URL will redirect you to the original link.

**Analytics** – Track the number of times a link was clicked and view timestamp history.

**REST API Endpoints** – Easily integrate with other applications.


**🛠️ Tech Stack**

**Node.js** – Backend runtime environment.

**Express.js** – Web framework for routing and handling HTTP requests.

**MongoDB with Mongoose** – Database to store URLs, shortened IDs, and click analytics.

**ShortID** – Library to generate unique short identifiers.

**📂 Project Structure**

1.controllers/      #Handles business logic (short URL generation, analytics)

2.models/           #Mongoose schemas (URL model)

3.routes/           #Express routes for API endpoints

4.connect.js        #Database connection setup

5.index.js          #Entry point of the application


**📌 How It Works**

1.User sends a POST request with a long URL.

2.Server generates a unique short ID and stores it in MongoDB along with the original URL.

3.Visiting the short URL (http://localhost:8001/:shortId) will:
  Redirect the user to the original URL.
  Save the visit timestamp in the database.
  
4.Users can check analytics via /url/analytics/:shortId.

**📖 Example**

**POST /url**
{
  "url": "https://example.com/very/long/link"
}
**Response**
{
  "id": "XyZ123"
}

**Visit**
http://localhost:8001/XyZ123 → redirects to original URL

**Analytics**
GET /url/analytics/XyZ123 → returns total clicks & visit history


**🤝 Contribution**
Feel free to fork this repo, open issues, and submit PRs to improve the project.
