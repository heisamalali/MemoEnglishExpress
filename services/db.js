const sql = require('mssql');


const config = {
    server : 'localhost',
    database : 'MemoEnglish',
    user : 'sa',
    password : '123',
    options : {
        trustedConnection : true,
        enableArithAbort : true,
        trustServerCertificate : true
    }
}

async function executeQuery(query,values=[],paramNames =[],isStoredProcedure = true, outputParamName = null) {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();

        if(values && paramNames){
            for(let i=0;i<values.length;i++){
                request.input(paramNames[i],values[i])
            }
        }

        if(outputParamName){
            request.output(outputParamName,sql.Int);
        }

        values.forEach((val,index)=>{
            if(typeof val === 'undefined'){
                console.error(`Undefined value found for ${paramNames[index]}`)
            }
        })

        let result;
        if(isStoredProcedure){
            result = await request.execute(query);
        }else{
            result = await request.batch(query);
        }

        if(outputParamName){
            result = {...result , [outputParamName]: request.parameters[outputParamName].value}
        }

        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function executTableValueQuery(query,table,paramNames =[], isStoredProcedure = true,outputParamName=[]) {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();

        if(table instanceof sql.Table){
            request.input(paramNames,table);
        }

        if(outputParamName){
            request.output(outputParamName,sql.Int);
        }

        let result;
        if(isStoredProcedure){
            result = await request.execute(query);
        }else{
            result = await request.batch(query);
        }

        if(outputParamName){
            result = {...result , [outputParamName]: request.parameters[outputParamName].value}
        }

        return result;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    connect : () => sql.connect(config),
    sql,
    executeQuery,
    executTableValueQuery
}