# 🔍 Smart Image Search

A full-stack web application that allows users to upload, browse, and search images through an interactive interface. Built with React and Vite on the frontend, Node.js and Express on the backend, and MySQL for database management.

## ✨ Features

- **Image Search:** Search for images using keywords.
- **Image Gallery:** Browse images in a card-based layout.
- **Image Upload:** Upload images through the application.
- **Category Filters:** Filter images by category and available tags.
- **Image Preview:** View images in a larger preview modal.
- **Search Index:** Build an in-memory search index when the backend starts.
- **Chatbot Integration:** Chat interface for image-related assistance.
- **Responsive UI:** Modern interface designed for convenient browsing.
- **Database Integration:** Store and retrieve image metadata using MySQL.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development server |
| React Router | Client-side navigation |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MySQL | Database |
| XAMPP | Local MySQL environment |
| JavaScript (ES Modules) | Application logic |
| CSS | Styling and responsive design |

## 📁 Project Structure

```text
DSA-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── ImageModal.jsx
│   │   │   ├── UploadModal.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   └── AlgoVisualizer.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── imageRoutes.js
│   │   ├── metaRoutes.js
│   │   └── chatbotRoutes.js
│   ├── services/
│   │   ├── imageService.js
│   │   └── searchIndex.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: The structure above is illustrative. Adjust filenames and folders to match your actual repository.*

## ⚙️ Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)
- [Git](https://git-scm.com/)
- A modern web browser

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "DSA project"
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Configure the MySQL Database

1. Open the XAMPP Control Panel.
2. Start MySQL.
3. Open [phpMyAdmin](http://localhost/phpmyadmin).
4. Create the database required by the application.
5. Configure the database name and credentials in the backend environment file.

Use the database schema or SQL setup file included in your repository. If one is not included, add the schema before running the application.

### 3. Configure the Backend

Open a terminal in the project directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory using your actual configuration:

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=your_database_name
```

Update the database credentials and database name to match your local setup.

**Important:** Never commit your real passwords, API keys, or other secrets to GitHub.

### 4. Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

The backend should start at:

`http://localhost:4000`

Health-check endpoint:

`http://localhost:4000/api/health`

The backend connects to MySQL and loads image metadata to build the search index during startup.

### 5. Configure and Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite development URL:

`http://localhost:5173`

Keep both the frontend and backend running while using the application.

## 🖼️ Image Storage

The application serves uploaded image files through the backend's `/uploads` route.

For example:

```text
http://localhost:4000/uploads/example.jpg
```

The exact file location depends on the backend upload configuration.

Ensure that:

- Uploaded files are stored in the configured upload directory.
- Database records reference the correct image paths.
- Image URLs point to actual image files.
- Seed images contain valid image data.
- The upload directory is preserved when moving or deploying the project.

Large image files and private uploads should not be committed to GitHub unnecessarily.

## 🔎 How It Works

1. The user opens the image gallery.
2. The frontend requests image data from the backend API.
3. The backend retrieves image metadata from MySQL.
4. The search service builds an in-memory index during startup.
5. Users search, filter, and browse available images.
6. The frontend displays matching image cards and previews.
7. Users can upload images through the upload interface.

## 🧠 Data Structures and Algorithms

This project can demonstrate several concepts relevant to Data Structures and Algorithms:

- **Searching:** Finding relevant images using query terms.
- **Indexing:** Organizing image metadata for efficient retrieval.
- **Arrays and Objects:** Managing image records and search results.
- **Filtering:** Narrowing results by categories and tags.
- **Sorting:** Ordering image results when supported by the implementation.

The exact search algorithm and time complexity depend on the implementation in the search service.

## 🐛 Troubleshooting

### MySQL Connection Error

If you see:

```text
ECONNREFUSED 127.0.0.1:3306
```

Start MySQL from the XAMPP Control Panel and verify the port and credentials.

### Images Are Not Loading

- Check that the backend is running.
- Verify that the image URL returns the actual image.
- Confirm that the image file exists in the upload directory.
- Check the browser's Developer Tools → Network tab for failed image requests.
- Verify the image paths stored in MySQL.

### CORS Errors

Ensure the backend allows the frontend origin:

```text
http://localhost:5173
```

### Frontend Cannot Connect to Backend

Check the API base URL in the frontend service configuration and confirm that it points to the correct backend port.

## 🔐 Security Notes

- Keep `.env` files out of version control.
- Add `.env` and other secret files to `.gitignore`.
- Validate uploaded file types and sizes on the server.
- Use appropriate authentication and authorization if the application is exposed publicly.
- Avoid exposing database credentials or private uploaded files.

## 🔮 Future Improvements

- More advanced image search and ranking.
- Image similarity search using computer vision.
- Automatic image tagging and classification.
- Pagination and improved gallery performance.
- User authentication and personal collections.
- Cloud-based image storage.
- Improved mobile responsiveness.
- Automated testing and deployment.

## 👨‍💻 Author

**Aditya Chaurasia**

GitHub: [Add your GitHub profile URL](https://github.com/)

## 📄 License

Choose a license for your project before distributing it. For example, the MIT License permits reuse subject to its terms. Add a `LICENSE` file if you choose MIT.
