import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to Speech To Text");
});

app.use((err, req, res, next) => {
    console.error("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
