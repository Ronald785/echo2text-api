# Speech-To-Text API

## Description
An API to convert speech to text using OpenAI's Whisper model. It allows for fast and efficient transcription of audio files.

## Technologies Used
- Node.js
- Express
- OpenAI Whisper
- Multer (file uploads)
- Helmet, Compression, Morgan (security and logging)
- CORS

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/Ronald785/speech-to-text-server
   cd speech-to-text-server
   ```

2. Install the dependencies:
   ```sh
   pnpm install
   ```

3. Create a `.env` file and define the necessary variables:
   ```env
   PORT=3000
   OPENAI_API_KEY=your-api-key
   ```

4. Start the server:
   ```sh
   pnpm dev
   ```

## Usage

### Transcription Endpoint
- **Method:** POST
- **Route:** `/transcribe`
- **Content-Type:** `multipart/form-data`
- **Parameter:** `audio` (audio file to be transcribed)
- **Supported Formats:** `flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm`
- **Maximum Size:** `100MB`

### Example Request with cURL
```sh
curl -X POST http://localhost:3000/transcribe \
     -H "Content-Type: multipart/form-data" \
     -F "audio=@path/to/file.mp3"
```

## Project Structure
```
├── app
│   ├── routes
│   │   ├── routes.js             # API route definitions
│   ├── utils
│   │   ├── __dirname.js          # Utility for directory manipulation
│   ├── openai
│   │   ├── speechToText.js       # Function for OpenAI Whisper integration
├── uploads (temporary file storage)
├── view
│   ├── index.html                # API documentation (accessible via browser)
├── server.js                     # Main file that sets up and starts the server
├── .gitignore                    # Files and folders ignored by Git
├── LICENSE                       # Project license file
├── pnpm-lock.yaml                # Project dependencies
├── package.json                  # Project package management
└── .env                          # Environment configuration, such as the OpenAI API key
```

## License
This project is licensed under the **MIT** License. See the [LICENSE](./LICENSE) file for more details.

## Author
**Ronald Almeida**
