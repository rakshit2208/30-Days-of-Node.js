const fs = require('fs');

function writeToFile(filePath, content){
    fs.writeFile(filePath,content,(err)=>{
        if(err)
        {
            console.log(err);

        }else{
            console.log('Data Written to Output.txt');
        }
    })
}

writeToFile('test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
