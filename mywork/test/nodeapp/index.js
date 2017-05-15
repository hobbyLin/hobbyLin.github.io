/**
 * Created by Administrator on 2017/5/2.
 */
var fs = require('fs'),
    stdin = process.stdin,
    stdout=process.stdout;
// console.log(fs.readdirSync(__dirname));
// fs.readdir(__dirname,function(err,file){
//     console.log(file);
// });
//process.stdout.write('ddd');







fs.readdir(process.cwd(),function(err,files){
    var stats = [];
    console.log('');
    if(!files.length){
        return console.log('  \033[31m No files to show! \033[39m\n');
    }
    console.log('  Select which file or directory you want to see \n');
    function read(){
        console.log('');
        stdout.write('  \033[33m Enter your choice: \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data',option);
    }
    function option (data){
        var fileName = files[Number(data)];
        if(!fileName){
            stdout.write('  \033[31m Enter your choice : \033[39m');
        }else{
            stdin.pause();
            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname + '/'+fileName,function(err,files){
                    console.log('');
                    console.log('   (' + files.length + 'files)');
                    files.forEach(function(file){
                        console.log('   -  ' +file);
                    });
                    console.log('');
                })
            }else{
                fs.readFile(__dirname+'/'+fileName,'utf8',function(err,data){
                    console.log('');
                    console.log('\033[90m' + data.replace(/(.*)/g,'  $1') + '\033[39m');
                })
            }



        }
    }
    function file(i){
        var fileName = files[i];
        fs.stat(__dirname + '/' + fileName, function(err,stat){
            stats[i] = stat;
            if(stat.isDirectory()){
                console.log('  '+i+'  \033[36m'+fileName+'/\033[39m')
            }else{
                console.log('  '+i+'  \033[90m'+fileName+'/\033[39m')
            }

            if(++i == files.length){
                read();
            }else{
                file(i);
            }

        });
    }
    file(0);
    console.log(process.argv);

})