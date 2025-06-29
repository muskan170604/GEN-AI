import {hasAutoParseableInput} from "openai/lib/parser.mjs"
import readlineSync from 'readline-sync';

const History={

}

function sum(num1,num2){
    return num1+num2;
}

function prime(num){
    if(num<2){
        return false;
    }

    for(let i=2;i<=Math.sqrt(num);i++){
        if(num%i==0){
            return false;
        }else{
            return true;
        }
    }
}

async function getcryptoprice({coin}){
    const response=await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`)

    const data=await response.json();

    return data;
}

const sumDeclaration={
    name:'sum',
    description:"get the sum of 2 number",
    parameter:{
        type:'OBJECT',
        properties:{
            num1:{
                type:'NUMBER',
                description:'It will be first number for addition ex: 13',
            },
            num2:{
                type:'NUMBER',
                description:'It will be second number for addition ex:10'
            }
        },
        required:['num1','num2']
    }
}


const primeDeclaration={
    name:'prime',
    description:"get if number if prime or not",
    parameter:{
        type:'OBJECT',
        properties:{
            num:{
                type:'NUMBER',
                description:'It will be the number is to find it is prime or not ex: 13',
            },
        },
        required:['num']
    }
}


async function runAgent(userProblem){

    History.push({
        role:'user',
        parts:[{text:userProblem}]
    });

    const response=await await ai.models.generateContent({
        model: "gemini-2.5-flash",
        content:History
    })
}


async function main(){
    const userProblem=readlineSync.question("Ask me anything..");
    await runAgent(userProblem);
    main();
}

main();



getcryptoprice('bitcoin')

console.log(userProblem)