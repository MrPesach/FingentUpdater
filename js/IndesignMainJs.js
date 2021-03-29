var CSLibrary = new CSInterface();
var productData;
var wholeProductFromInDesign = '';
var errorValues = '';
var warningValues = '';
var successValues = '';

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
        alert('btnScanningProceed click error- '+er);
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
        alert('btnScanningProceed click warning '+er);
    }
}

if(successValues != '' && successValues.length > 0) 
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
    alert('btnScanningProceed click warning '+er);
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
                UpdateProductDetailsIntheIndesignFile();
               
    });
});

/////////////////////////////////// Scanning Result End /////////////////////////////////////////////////////

/////////////////////////////////// Go to index file creation Statrt /////////////////////////////////////////////////////
$('#btnGotoIndexFileCreation').live( "click", function() {
    $.get( "../html/IndexFileCreation.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
                
    });
});

///////////////////////////////////  Go to index file creation End /////////////////////////////////////////////////////


}
catch(e){
    alert('Error from ready function-'+e);       
}  
}); 




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
            catch(e)
            {
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
                    if(splitResults.length == 3)
                    {                    
                        errorValues = splitResults[0];
                        warningValues = splitResults[1];
                        successValues= splitResults[2];
                        $('#btnScanningProceed').prop('disabled', false);
                        $('.maskedCircle').remove();
                        $('#divScanningProgressBar').css("width", "100%");
                        alert('Process completed');
                        $('#btnScanningProceed').trigger('click');
                    }
                }
                else
                {
                    alert('There is no product details!');
                }      
            
                }
                catch(er)
                {
                    alert('Error from GetProductDetailsFromIndesignFile-'+er);
                }
            });
        }
        else
        {
            alert('There is no product details!');
        }
    
    //// alert(productData);
    }
    catch(e){
        alert('Error from GetProductDetails'+e);
       }   
}

////////////// JSX CALLS  //////////////


function UpdateProductDetailsIntheIndesignFile()
{
    var fnAndArgs = 'UpdateProductDetailsIntheIndesignFile(' + productData + ')';
    CSLibrary.evalScript(fnAndArgs, function(result) 
    {
        try
        {
         
if(result.length > 0)
{
    $('#btnGotoIndexFileCreation').prop('disabled', false);
    $('.maskedCircle').remove();
    $('#divScanningProgressBar').css("width", "100%");
    alert('Updated successfully.');
}
else
{

}

        }
        catch(er)
        {
            alert('Error from UpdateProductDetailsIntheIndesignFile-'+er);
        }
    });
}

function JSONToCSVConvertor() {
    alert('JSONToCSVConvertor');
        try
        {
    
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

            const json2csv = require('json2csv').parse;

const csvString = json2csv(JSONData);
res.setHeader('Content-disposition', 'attachment; filename=shifts-report.csv');
res.set('Content-Type', 'text/csv');
res.status(200).send(csvString);
           
           /* var ReportTitle = 'Product,Length,Weight,Price';
            var ShowLabel = false;
    
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            
                var CSV = '';
                //Set Report title in first row or line
            
                CSV += ReportTitle + '\r\n\n';
            
                //This condition will generate the Label/Header
                if (ShowLabel) {
                var row = "";
            
                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {
            
                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }
            
                row = row.slice(0, -1);
            
                //append Label row with line break
                CSV += row + '\r\n';
                }
            
                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                var row = "";
            
                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }
            
                row.slice(0, row.length - 1);
            
                //add a line break after each row
                CSV += row + '\r\n';
                }
            
                if (CSV == '') {
                alert("Invalid data");
                return;
                }
            
                //Generate a file name
                var fileName = "aneesh_";
                //this will remove the blank-spaces from the title and replace it with an underscore
                fileName += ReportTitle.replace(/ /g, "_");
            
                //Initialize file format you want csv or xls
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
            
                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension    
            
                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;
            
                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
            
                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                */
            }
            catch(er)
            {
                alert(er);
            }
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
