var CSLibrary = new CSInterface();
var productData;
var wholeProductFromInDesign = '';
var errorValues = '';
var warningValues = '';
var successValues = '';
var resultForIndex = '';
var indexFilePath ='';


$(document).ready(function () { 
    try{
       /// alert(' js ready');
       
        $.get( "../html/indexSub.html", function( data ) 
        {
                    $('#divPageContentDiv').html( data );
        });



/////////////////////////////////////Index Page Start///////////////////////////////////////////////////


        $('#aTagProccedToScanningPage').live( "click", function() {
            ///alert( 'alert from aTagProccedToScanningPage' );
            $.get( "../html/ScanningInDesign.html", function( data ) 
            {
                        $('#divPageContentDiv').html( data );
                        GetProductDetails();
            });
    
        });
////////////////////////////////////Index Page End///////////////////////////////////////////////////////////////////



/////////////////////////////////////Scanning Indesign Page Start/////////////////////////////////

$('#btnIndesignScanCancel').live( "click", function() {
    ///alert( 'alert from aTagProccedToScanningPage' );
    $.get( "../html/indexSub.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
    }); 

});

 /*Collapse*/

 /*
 var coll = document.getElementsByClassName("info-hd");
 var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}
*/

/*Copy button text change on click*/

/*
var btnCopy = document.getElementsByClassName("btn-copy-text");
var btnText;
console.log(btnText)
 var j;

 btnCopy[0].addEventListener("click", function() {
     btnCopy[0].innerHTML = 'Missing Values Copied';  
     setTimeout(function(){ 
       btnCopy[0].innerHTML = 'Copy Missing Values';  
   }, 2000);      
  });

  btnCopy[1].addEventListener("click", function() {
     btnCopy[1].innerHTML = 'Error Copied';  
     setTimeout(function(){ 
       btnCopy[1].innerHTML = 'Copy Error';  
   }, 2000);      
  });
*/




$('#btnScanningProceed').live( "click", function() 
{
    ///alert( 'alert from aTagProccedToScanningPage' );
    $.get( "../html/ScanningInDesignResult.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
                ///alert(errorValues);
if(errorValues != '' && errorValues.length > 0) 
{
    try
    {
        $('#divErrors').show(); 
        if(warningValues != '' && warningValues.length > 0)
        {
            $('#divWarnings').show();
        }
        else
        {
            $('#divWarnings').remove();
        }
       
        $('#divSuccess').remove();

        $('#pFooterForErrorWarning').show();
        $('#pFooterForSuccess').remove();
        $('#divCopyCtrls').remove();
        var rows =   errorValues.split('R12W'); 
        ////alert('rows.length'+rows.length);
        var errorHtml ="";
        for(var row = 0; row < rows.length;row++)
        {
            var eachRow = rows[row];
           
            var columns = eachRow.split('C12L');
            errorHtml +=  "<div class='row' style='color:#FF3E5A'> Errors</div>";
            if(columns[0] == 1)///is it a new page
            {
                //product
                if(row == 0)
                {
                    errorHtml +=  "<div id='divErrorPage"+ row +"' class='info-hd errorPage'>Page-"+columns[1] +"</div>";
                }
                else
                {
                    errorHtml +=  "</ul> <div id='divErrorPage"+ row +"' class='info-hd errorPage'>Page-"+columns[1] +"</div>";
                 }
                errorHtml +=  "<ul style='display:none;' class='info-list error-list' id='ulErrors"+ row +"'>";
                errorHtml +=  "<li><img src='../img/error.png' class='tick'> <span class='PdtCls'> "+ columns[2] +"("+  columns[5] +") </span></li>";
            }
            else
            {  
                //product
                errorHtml +=  "<li><img src='../img/error.png' class='tick'> <span class='PdtCls'> "+ columns[2] +"("+  columns[5] +") </span> </li>";
            }
        }

        errorHtml +=  " </ul>";
        $('#divErrors').html(errorHtml);
    }
    catch(er)
    { 
        $('#spanEror').text('Error btnScanningProceed from -' + er);
        alert('btnScanningProceed click error- ' + er);
    }
}

    if(warningValues != '' && warningValues.length > 0) 
    {
        try
        {
            $('#divWarnings').show();
            if(errorValues != '' && errorValues.length > 0) 
            {
                $('#divErrors').show(); 
            }
            else
            {
                $('#divErrors').remove(); 
            }
           
           
            $('#divSuccess').remove();

            $('#pFooterForErrorWarning').show();
            $('#pFooterForSuccess').remove();
            $('#divCopyCtrls').show();
            

        var rows =   warningValues.split('R12W'); 
     //// alert('rows.length-'+rows.length);
        var warningHtml ="<div class='row' style='color:#F0B65B'>Warnings</div>";
        for(var row = 0; row < rows.length;row++)
        {
            var eachRow = rows[row];
            var columns = eachRow.split('C12L');
           ///alert(eachRow);
            if(columns[0] == 1)///is it a new page
            {
                //product
               
                if(row == 0)
                {
                    warningHtml +=  "<div id='divWarningPage"+ row +"' class='info-hd warningPage'>Page-"+columns[1] +"</div>"; 
                }
                else
                {
                    warningHtml +=  "</ul><div id='divWarningPage"+ row +"' class='info-hd warningPage'>Page-"+columns[1] +"</div>";
                }
                warningHtml +=  " <ul style='display:none;' class='info-list error-list warring-list' id='ulWarnings"+ row +"'>";
                warningHtml +=  "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls'> "+ columns[2] + "("+  columns[5]+") </span></li>";
            }
            else
            {  
                //product
                warningHtml +=  "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls'> "+ columns[2]  +"("+  columns[5]+") </span> </li>";
            }
        }
        warningHtml +=  " </ul>";
        $('#divWarnings').html(warningHtml);
    }
    catch(er)
    {
        $('#spanEror').text('Error from btnScanningProceed-' + er);
        alert('btnScanningProceed click warning ' + er);
    }
}

if(successValues != '' && successValues.length > 0 && warningValues.length == 0 && errorValues.length == 0) 
{
    try
    {
        $('#divErrors').remove();
        $('#divWarnings').remove();
        $('#divSuccess').show();
        $('#pFooterForErrorWarning').remove();
        $('#pFooterForSuccess').show();
        $('#divCopyCtrls').remove();
    var rows =   successValues.split('R12W'); 
 //// alert('rows.length-'+rows.length);
    var successHtml ="<div class='row' style='color:#1DC198'>Success</div>";
    for(var row = 0; row < rows.length;row++)
    {
        var eachRow = rows[row];
        var columns = eachRow.split('C12L');
       ///alert(eachRow);
        if(columns[0] == 1)///is it a new page
        {
            //product
           
            if(row == 0)
            {
                successHtml +=  "<div id='divSuccess" + row + "' class='info-hd successPage'>Page-"+columns[1] +"</div>"; 
            }
            else
            {
                successHtml +=  "</ul><div id='divSuccess" + row + "' class='info-hd successPage'>Page-"+columns[1] +"</div>";
            }
            successHtml +=  " <ul style='display:none;' class='info-list' id='ulSuccess" + row +"'>";
            successHtml +=  "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls'> "+ columns[2] +"("+  columns[5]+") </span> </li>";
        }
        else
        {  
            //product
            successHtml +=  "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls'> "+ columns[2] +"("+  columns[5]+")  </span></li>";
        }
    }
    successHtml +=  " </ul>";
    $('#divSuccess').html(successHtml);
}
catch(er)
{
    $('#spanEror').text('Error from btnScanningProceed -' + er);
    alert('btnScanningProceed click warning ' + er);
}
}
               
    });

});///$('#btnScanningProceed').live( "click", function()-- Close



$('.errorPage').live( "click", function() {
    var Str = $(this).attr('id');
    var toRemove = 'divErrorPage';
    var balPortion = Str.replace(toRemove, '');

    if ($('#ulErrors'+balPortion).is(':visible')) {
        $('#ulErrors'+balPortion).hide();
        $(this).removeClass('active');
      }
      else{
        $('#ulErrors'+balPortion).show();
        $(this).addClass('active');
      }

});

$('.warningPage').live( "click", function() {
    var Str = $(this).attr('id');
    var toRemove = 'divWarningPage';
    var balPortion = Str.replace(toRemove, '');
    if ($('#ulWarnings'+balPortion).is(':visible')) 
    {
        $(this).removeClass('active');
        $('#ulWarnings'+balPortion).hide();
      }
      else{
            $('#ulWarnings'+balPortion).show();
            $(this).addClass('active');
      }
    
});

$('.successPage').live( "click", function() {
    var Str = $(this).attr('id');
    var toRemove = 'divSuccess';
    var balPortion = Str.replace(toRemove, '');
    if ($('#ulSuccess'+balPortion).is(':visible')) 
    {
        $(this).removeClass('active');
        $('#ulSuccess'+balPortion).hide();
      }
      else{
            $('#ulSuccess'+balPortion).show();
            $(this).addClass('active');
      }
    
});


$('#btnWarningsCopy').live( "click", function() {

var content = "";
$("div[id^='divWarningPage']").each(function(index, item) 
{
       content += $(this).html()+'<br>';
    var Str = $(this).attr('id');
    var toRemove = 'divWarningPage';
    var balPortion = Str.replace(toRemove, '');
    $("#ulWarnings"+balPortion + " .PdtCls").each(function() {
        content += $(this).text()+'<br>';
    });

});

var $temp = $("<textarea>");
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val(content.replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();

alert('Copied');

});
   

$('#btnErrorCopy').live( "click", function() {
  
    var content = "";
$("div[id^='divErrorPage']").each(function(index, item) 
{
       content += $(this).html()+'<br>';
    var Str = $(this).attr('id');
    var toRemove = 'divErrorPage';
    var balPortion = Str.replace(toRemove, '');
    $("#ulErrors"+balPortion + " .PdtCls").each(function() {
        content += $(this).text()+'<br>';
    });

});

var $temp = $("<textarea>");
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val(content.replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();

alert('Copied');
});

////////////////////////////////////Scanning Indesign Page End/////////////////////////////////////////////////

////////////////////////////////////Scanning Indesign Result Start/////////////////////////////////////////////////
$('#btnCancelScanningResult').live( "click", function() {
    ///alert( 'alert from aTagProccedToScanningPage' );
    $.get( "../html/ScanningInDesign.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
    });

});

////////////////////////////////////Scanning Indesign Result End/////////////////////////////////////////////////

/////////////////////////////////// Scanning Result Statrt /////////////////////////////////////////////////////
$('#btnProceedScanning').live( "click", function() {
    $.get( "../html/CommunicatingWithAppAndIndesign.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
                /////alert('successValues'+successValues);
                UpdateProductDetailsIntheIndesignFile();
               
    });
});

/////////////////////////////////// Scanning Result End /////////////////////////////////////////////////////

/////////////////////////////////// Go to index file creation Statrt /////////////////////////////////////////////////////
$('#btnGotoIndexFileCreation').live( "click", function() {
    $.get( "../html/IndexFileCreation.html", function( data ) 
    {
                $('#divPageContentDiv').html(data);

    });
});
$('#btnOk').live( "click", function() {
    window.close();
});

$('#btnDownloadIndexFile').live( "click", function() {
    /////alert('btnDownloadIndexFile'+indexFilePath);
    if(indexFilePath == '' || indexFilePath == null || indexFilePath == undefined)
    {
        alert('Need to set the index file path!')
    }
    else
    {
        var fs = require('fs');  
        if (fs.existsSync(indexFilePath)) 
        {
       //// alert('resultForIndex'+resultForIndex);
            if(resultForIndex != '' && resultForIndex != null && resultForIndex != undefined)
            {
                var rows =   resultForIndex.split('R12W'); 
                ////alert('rows.length'+rows.length);
                var csvContent = "SKU,Page No \r\n";
                for(var row = 0; row < rows.length;row++)
                {
                    var eachRow = rows[row];
                    var columns = eachRow.split('C12L');           
                    csvContent += columns[0]  + ',' + columns[1]  + "\r\n";
                }
                
                fs.writeFile(indexFilePath+"\\index.csv", csvContent, function (er)
                { 
                    if (er)
                    {
                        alert('Operation failed('+er+")");
                        $('#spanEror').text('Error from btnDownloadIndexFile -' + er);
                    }                    
                    else
                    {
                        alert('Index file downloaded('+indexFilePath+')');
                    }                   
                });
            }
        }
        else
        {
            alert('Index file path does not exists(' + indexFilePath + ')');
        }


        /* var fs = require('fs');
        var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';    
        fs.rename(baseUrl, indexFilePath, function (err) 
        {      
        if (err) 
        {

        }     
        else
        {
            alert('Index file downloaded('+indexFilePath+')');
        }
        }); */
}
});


///////////////////////////////////  Go to index file creation End /////////////////////////////////////////////////////


}
catch(er){
    $('#spanEror').text('Error from ready function-' + er);
    alert('Error from ready function-' + er);       
}  
}); 


function DownloadFile()
{
    var fs = require('fs')
    
    var oldPath = 'D:\\RCG\\From\\TestFile.txt'
    var newPath = 'D:\\RCG\\To\\TestFile.txt'
    
    fs.rename(oldPath, newPath, function (err) {
        alert(err);
      if (err) throw err
      console.log('Successfully renamed - AKA moved!')
    });
}

function Create()
{
    try{
        var fs = require('fs');
       var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
       alert(baseUrl);

       var  JSONData=[
        {
        Product: 'ZYWER4246',
        Length: '1',
        Weight: '90',
        Price: '4000'
        },
        {
        Product: 'ZER677',
        Length: '1',
        Weight: '90',
        Price: '4000'
        },
        {
        Product: '517ER',
        Length: '1',
        Weight: '90',
        Price: '4000'
        },
        {
        Product: 'ZYWER4291',
        Length: '1',
        Weight: '90',
        Price: '4000'
        }
    ];

        var csvContent =  "Style Code,Page No \r\n";
        for(var t = 0; t < JSONData.length;t++)
        {
            csvContent += JSONData[t].Product + ',' + JSONData[t].Length + "\r\n";
        }

        var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
        fs.writeFile(baseUrl, csvContent, function (err) 
        { 
                                if (err)
                                {
                                    alert('Operation failed'+err);
                                }                                
                                else
                                {
                                    alert('File created.');
                                }        
        });
    
    /*
    const fs = require('fs');
const https = require('https');
  
// URL of the image
const url = 'C:\\Users\\rcg.user\\Desktop\\INDD Files\\3-3-2021\\Catalog 165-180.indd';
  
https.get(url,(res) => {
    alert('url-'+url);
    // Image will be stored at this path
    const path = `${__dirname}/files/img.indd`; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
});
*/



    }
    catch(er)
    {
        $('#spanEror').text('Error from -' + er);
            alert(er);
    }
}


function GetProductDetails()
{   
    try
    {
        ///alert(process.env.APPDATA);
        var fs = require('fs');    
       var productDetails = fs.readFileSync(process.env.APPDATA + '/RCG/ProductDetails.txt',{encoding:'utf8'});
     ///alert(productDetails);
        if(productDetails != null && productDetails != '' && productDetails != undefined)
        {
            ///alert(productDetails);
            try
            {
                ///var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
                ///var myJSON = JSON.stringify(obj);
               var data = jQuery.parseJSON(productDetails);
                productData = data.Products;
                indexFilePath = data.IndexFilePath;
              /*  if(productData != null && productData != '' && productData != undefined)
                {
                    alert('productData-'+productData.length);
                }
                else
                {
                    alert('Else');
                }
               /// 
               */
                var newJson = [];
                for(var t = 0; t < productData.length;t++)
                {
                ////    alert(productData[t1].Product);
                    newJson.push(productData[t]); 
                }
                productData  =  JSON.stringify(newJson);                      
            }
            catch(er)
            {
                $('#spanEror').text('Error Invalid json format from -' + er);
                alert('Invalid json format')
            }
        
            var fnAndArgs = 'GetProductDetailsFromIndesignFile(' + productData + ')';
            ///alert(fnAndArgs);
            CSLibrary.evalScript(fnAndArgs, function(result) 
            {
                try
                {
                ///alert('GetProductDetailsFromIndesignFile in js-'+result);       
                if(result != null && result != '' && result != undefined )
                { 
                    var splitResults = result.split('T123T');
                    ////$('#spanEror').text('splitResults.length-'+splitResults.length);
                    if(splitResults.length == 3)
                    {                    
                        errorValues = splitResults[0];
                        warningValues = splitResults[1];
                        successValues = splitResults[2];
                        ///alert(successValues);
                        $('#btnScanningProceed').prop('disabled', false);
                        $('.maskedCircle').remove();
                        $('#divScanningProgressBar').css("width", "100%");
                        alert('Process completed');
                        $('#btnScanningProceed').trigger('click');
                    }
                    else
                    {
                        alert(result);
                    }
                }
                else
                {
                    alert('There is no product details!');
                }      
            
                }
                catch(er)
                {
                    $('#spanEror').text('Error from GetProductDetailsFromIndesignFile-' + er);
                    ///alert('Error from GetProductDetailsFromIndesignFile-'+er);
                }
            });
        }
        else
        {
            alert('There is no product details!');
        }
    
    //// alert(productData);
    }
    catch(er){
        $('#spanEror').text('Error from GetProductDetails-' + er);
        alert('Error from GetProductDetails' + er);
       }   
}

////////////// JSX CALLS  //////////////
function UpdateProductDetailsIntheIndesignFile()
{
    var fnAndArgs = 'UpdateProductDetailsIntheIndesignFile(' + productData + ')';
    ///alert(fnAndArgs);
    CSLibrary.evalScript(fnAndArgs, function(result) 
    {
        try
        {
            if(result.length > 0)
            {               
                resultForIndex = result;
               
              ///  alert(result);
                $('#btnGotoIndexFileCreation').prop('disabled', false);
                $('.maskedCircle').remove();
                $('#divScanningProgressBar').css("width", "100%");
                alert('Updated successfully.');
            }
            else
            {
                alert('Result not found!');
            }
        }
        catch(er)
        {
            $('#spanEror').text('Error from -' + er);
            ////alert('Error from UpdateProductDetailsIntheIndesignFile-'+ er);
        }
    });
}


/*

function MoveFileFromOneLocationToAnother()
{
    var fs = require('fs')
    
    var oldPath = 'D:\\RCG\\From\\TestFile.txt'
    var newPath = 'D:\\RCG\\To\\TestFile.txt'
    
    fs.rename(oldPath, newPath, function (err) {
        alert(err);
      if (err) throw err
      console.log('Successfully renamed - AKA moved!')
    });
}

function CopyAllFiles()
{
    // Node.js program to demonstrate the 
// fs.copyFile() method 
  
// Import the filesystem module 
const fs = require('fs'); 

// Get the current filenames 
// before the function 
getCurrentFilenames(); 
console.log("\nFile Contents of example_file:", 
fs.readFileSync("example_file.txt", "utf8")); 

// Copying the file to a the same name 
fs.copyFile("example_file.txt", "copied_file.txt", (err) => { 
if (err) { 
  console.log("Error Found:", err); 
} 
else { 

  // Get the current filenames 
  // after the function 
  getCurrentFilenames(); 
  console.log("\nFile Contents of copied_file:", 
    fs.readFileSync("copied_file.txt", "utf8")); 
} 
}); 


*/

// Function to get current filenames 
// in directory 
function getCurrentFilenames() { 
console.log("\nCurrent filenames:"); 
fs.readdirSync(__dirname).forEach(file => { 
  alert(file); 
}); 
} 



var url='D:\\RCG\TestFile.txt';
var fileLocation='D:\\RCG\\';
var destinationUrl = 'http://test.ccpeople.com.au/Uploads/UserProfile/';
function DownloadFile(e)
{
      
        var http = require('http'),
        fs = require('fs');
    
    var request = http.get("http://www.gstatic.com/webp/gallery3/1.png", function(response) {
       
    if (response.statusCode === 200) {
       /// alert('get'+response.statusCode);   
            var file = fs.createWriteStream(destinationUrl,"ancopy.png");
            response.pipe(file);
            alert(file);
        }
        // Add timeout.
        request.setTimeout(12000, function () {
            request.abort();
        });
   
    });
}
        /*
        downloadURI(url,"tinyhouse");
        function downloadURI(uri, name) 
        {
            var link = document.createElement("a");
            // If you don't know the name or want to use
            // the webserver default set name = ''
            link.setAttribute('download', name);
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            link.remove();
            alert('downloadURI');
        }
*/

        /*
        Download('https://www.cryptocompare.com/media/19684/doge.png');
        
        function Download(url) {
           
            document.getElementById('my_iframe').src = url;
            alert(document.getElementById('my_iframe').src);
        };
*/

        /*
        var fs = require('fs'),
        request = require('request');
    
    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            alert('content-type:', res.headers['content-type']);
            alert('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    
        }); 
    };   
    
    download('https://www.cryptocompare.com/media/19684/doge.png', 'icons/taskks12.png', function(){
    alert('done');
    });
    */


    

/*
var http = require('http');
var fs = require('fs');

function pDownload(url, dest){
    alert('pDownload');
  var file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.
    http.get(url, response => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          if(responseSent)  return;
          responseSent = true;
          resolve();
        });
      });
    }).on('error', err => {
        if(responseSent)  return;
        responseSent = true;
        reject(err);
    });
  });
}

//example
pDownload(url, fileLocation)
  .then( ()=> console.log('downloaded file no issues...'))
  .catch( e => console.error('error while downloading', e));

*/

/*
var http = require('http');
var fs = require('fs');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};
      
*/


/*const http = require('http'); // or 'https' for https:// URLs
        const fs = require('fs');
        
        const file = fs.createWriteStream("file.jpg");
        const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
          response.pipe(file);
          alert('inside get');
        });

*/



        /*
        app.get('/download', function(req, res){
            const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
            res.download(file); // Set disposition and send it.
          });
*/
        
       //// e.preventDefault();
      //  window.location.href = "D:\\RCG\\TestFile.txt";   
     /*
      window.open(
            'D:\\RCG\\TestFile.txt',
            '_blank' // <- This is what makes it open in a new window.
          ); 

          alert('click done');  
          */
          


    

/*
$(document).ready(function () { 
    ///alert('ready');
    $("#link").click(function (e) { 
        e.preventDefault(); 
          alert('link click');
        window.location.href = "D:\\RCG\\TestFile.txt"; 
    }); 
}); 
*/
