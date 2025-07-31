import * as dotenv from 'dotenv';
dotenv.config();
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';


async function indexDocument(){
const PDF_PATH = './dsa.pdf';
const pdfLoader = new PDFLoader(PDF_PATH);
const rawDocs = await pdfLoader.load();
console.log("PDF loaded");

//chunking karo
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    });
const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
console.log("Chunking completed");

//vector embedding model

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
    });

    console.log("Embedding model configured")

    //Database ko bhi configure
    //initialize Pinecone Client

const pinecone=new Pinecone();
const pineconeIndex=pinecone.Index(process.env.PINECONE_INDEX_NAME);
console.log("Pinecone configured")

//langchain(chunking,embedding,database)

await PineconeStore.fromDocuments(chunkedDocs,embeddings,{
    pineconeIndex,
    maxConcurrency:5,
});

console.log("Data stored successfully")


}
indexDocument();