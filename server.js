import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use((req, res, next) => {
    const url = req.url || ''
    if (url.includes('lcjs')) {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
    }
    res.setHeader('Access-Control-Allow-Origin', '*')

    next()
})

app.use(express.static(path.join(__dirname, 'bench')))

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080')
})
