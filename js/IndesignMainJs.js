var CSLibrary = new CSInterface();
var productData;
var wholeProductFromInDesign = '';
var errorValues = '';
var warningValues = '';
var successValues = '';
var resultForIndex = '';
var indexFilePath ='';
var indexFileName ='';


$(document).ready(function () { 
    try{
       /// swal(' js ready');
       
       LoadIndexSubPage();

/////////////////////////////////////Index Page Start///////////////////////////////////////////////////


        $('#aTagProccedToScanningPage').live( "click", function() {
            ///swal( 'swal from aTagProccedToScanningPage' );
            $.get( "../html/ScanningInDesign.html", function( data ) 
            {
                        $('#divPageContentDiv').html( data );
                        GetProductDetails();
            });
    
        });
////////////////////////////////////Index Page End///////////////////////////////////////////////////////////////////



/////////////////////////////////////Scanning Indesign Page Start/////////////////////////////////

$('#btnIndesignScanCancel').live( "click", function() {
    ///swal( 'swal from aTagProccedToScanningPage' );
    ////LoadIndexSubPage();
});

 
$('#btnScanningProceed').live( "click", function() 
{
    ///swal( 'swal from aTagProccedToScanningPage' );
    $.get( "../html/ScanningInDesignResult.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
              ////  alert('errorValues'+errorValues.length );
if(errorValues != '' && errorValues.length > 0) 
{
    try
    {       
         $('#btnErrorCopy').show(); 
        $('#divErrors').show(); 
        if(warningValues != '' && warningValues.length > 0)
        {
            $('#btnWarningsCopy').show();
            $('#divWarnings').show();
        }
        else
        {
            $('#btnWarningsCopy').hide();
            $('#divWarnings').remove();
        }
       
        $('#divSuccess').remove();
        $('#pFooterForErrorWarning').show();
        $('#pFooterForSuccess').remove();
      ///  $('#divCopyCtrls').remove();
        var rows =   errorValues.split('R12W'); 
        ////swal('rows.length'+rows.length);
        var errorHtml =  "<div class='row' style='color:#FF3E5A'> Errors</div>";
        for(var row = 0; row < rows.length;row++)
        {
            var eachRow = rows[row];           
            var columns = eachRow.split('C12L');           
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
                errorHtml +=  "<li><img src='../img/error.png' class='tick'> <span class='PdtCls' title="+  columns[5] +">"+ columns[2] + "</span></li>";
            }
            else
            {  
                //product
                errorHtml +=  "<li><img src='../img/error.png' class='tick'> <span class='PdtCls' title="+  columns[5] +">"+ columns[2] +"</span> </li>";
            }
        }

        errorHtml +=  " </ul>";
        $('#divErrors').html(errorHtml);
    }
    catch(er)
    { 
        $('#spanEror').text('Error btnScanningProceed from -' + er);
        //// swal('btnScanningProceed click error- ' + er);
    }
}
////alert('warningValues'+warningValues.length);
    if(warningValues != '' && warningValues.length > 0) 
    {
        try
        {
           
            $('#btnWarningsCopy').show();
            $('#divWarnings').show();
            if(errorValues != '' && errorValues.length > 0) 
            { 
                $('#btnErrorCopy').show(); 
                $('#divErrors').show(); 
            }
            else
            {
                $('#btnErrorCopy').hide(); 
                $('#divErrors').remove(); 
            }           
           
            $('#divSuccess').remove();
            $('#pFooterForErrorWarning').show();
            $('#pFooterForSuccess').remove();
         ///   $('#divCopyCtrls').show();
            

        var rows =   warningValues.split('R12W'); 
     //// swal('rows.length-'+rows.length);
        var warningHtml ="<div class='row' style='color:#F0B65B'>Warnings</div>";
        for(var row = 0; row < rows.length;row++)
        {
            var eachRow = rows[row];
            var columns = eachRow.split('C12L');
           ///swal(eachRow);
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
                warningHtml +=  "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls' title="+  columns[5] +"> "+ columns[2] + "</span></li>";
            }
            else
            {  
                //product
                warningHtml +=  "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls' title="+  columns[5] +"> "+ columns[2]  + "</span> </li>";
            }
        }
        warningHtml +=  " </ul>";
        $('#divWarnings').html(warningHtml);
    }
    catch(er)
    {
        $('#spanEror').text('Error from btnScanningProceed-' + er);
        ////swal('btnScanningProceed click warning ' + er);
    }
}

////alert('successValues.length-'+successValues.length);
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
 //// swal('rows.length-'+rows.length);
    var successHtml ="<div class='row' style='color:#1DC198'>Success</div>";
    for(var row = 0; row < rows.length;row++)
    {
        var eachRow = rows[row];
        var columns = eachRow.split('C12L');
       ///swal(eachRow);
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
            successHtml +=  "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls' title="+  columns[5] +"> "+ columns[2] + " </span> </li>";
        }
        else
        {  
            //product
            successHtml +=  "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls' title="+  columns[5] +"> "+ columns[2] +" </span></li>";
        }
    }
    successHtml +=  " </ul>";
    $('#divSuccess').html(successHtml);
}
catch(er)
{
    $('#spanEror').text('Error from btnScanningProceed -' + er);
    ////swal('btnScanningProceed click warning ' + er);
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

$('.successPage').live("click", function() {
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
  ///swal('Copied');
  swal("Data Copied.", "", "success");
});
   

$('#btnErrorCopy').live( "click", function() {
  
    var content = "";
$("div[id^='divErrorPage']").each(function(index, item) 
{
       content += $(this).html()+'<br>';
    var Str = $(this).attr('id');
    var toRemove = 'divErrorPage';
    var balPortion = Str.replace(toRemove, '');
    $("#ulErrors" + balPortion + " .PdtCls").each(function() {
        content += $(this).text()+'<br>';
    });

});

var $temp = $("<textarea>");
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val(content.replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();

///swal('Copied');
swal("Data Copied.", "", "success");
});

////////////////////////////////////Scanning Indesign Page End/////////////////////////////////////////////////

////////////////////////////////////Scanning Indesign Result Start/////////////////////////////////////////////////
$('#btnCancelScanningResult').live( "click", function() {
    ///swal( 'swal from aTagProccedToScanningPage' );
   /* $.get( "../html/ScanningInDesign.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
    });
*/
});

////////////////////////////////////Scanning Indesign Result End/////////////////////////////////////////////////

/////////////////////////////////// Scanning Result Statrt /////////////////////////////////////////////////////
$('#btnProceedScanning').live( "click", function() {
    $.get( "../html/CommunicatingWithAppAndIndesign.html", function( data ) 
    {
                $('#divPageContentDiv').html( data );
                /////swal('successValues'+successValues);
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
    /////swal('btnDownloadIndexFile'+indexFilePath);
    if(indexFilePath == '' || indexFilePath == null || indexFilePath == undefined)
    {
        ////swal('Need to set the index file path!');
        swal({
            title: "Need to set the index file path!",
            text: "",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "",
            closeOnConfirm: true
          },
          function(){
            ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
          });
    }
    else
    {
        var fs = require('fs');  
        if (fs.existsSync(indexFilePath)) 
        {   
        }
        else
        {
            ////swal('Index file path does not exists(' + indexFilePath + ')');
            var dirHome = process.env [process.platform =="win32"?"USERPROFILE":"HOME"];
            indexFilePath = require ("path"). join (dirHome,"Desktop");
        }
       //// swal('resultForIndex'+resultForIndex);
            if(resultForIndex != '' && resultForIndex != null && resultForIndex != undefined)
            {
                var rows =   resultForIndex.split('R12W'); 
                ////swal('rows.length'+rows.length);
                var csvContent = "SKU,Page\r\n";
                for(var row = 0; row < rows.length;row++)
                {
                    var eachRow = rows[row];
                    if(eachRow != '' && eachRow != null && eachRow != undefined)
                    {
                        var columns = eachRow.split('C12L');           
                        csvContent += columns[0]  + ',' + columns[1]  + "\r\n";
                    }                    
                }
              ////  alert(indexFileName);
                
                fs.writeFile(indexFilePath + "\\" + indexFileName, csvContent, function (er)
                { 
                    if (er)
                    {   
                        swal({
                            title: "Operation failed!"+er,
                            text: "",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "",
                            closeOnConfirm: true
                          },
                          function(){
                            ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                          });
                        $('#spanEror').text('Error from btnDownloadIndexFile -' + er);
                    }                    
                    else
                    {
                        swal("Index file downloaded (" + (indexFilePath + "\\" + indexFileName) + ")", "", "success");
                        ////swal('Index file downloaded(' + indexFilePath + ')');
                    }                   
                });
            }
            else
            {
                swal({
                    title: "There is no data to create the index file",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "",
                    closeOnConfirm: true
                  },
                  function(){
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                  });
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
            swal('Index file downloaded('+indexFilePath+')');
        }
        }); */
}
});


///////////////////////////////////  Go to index file creation End /////////////////////////////////////////////////////


}
catch(er){
    $('#spanEror').text('Error from ready function-' + er);
    ////swal('Error from ready function-' + er);       
}  
}); 

function LoadIndexSubPage()
{
    $.get( "../html/indexSub.html", function( data ) 
    {


                $('#divPageContentDiv').html( data );
    });
}

function DownloadFile()
{
    var fs = require('fs')
    
    var oldPath = 'D:\\RCG\\From\\TestFile.txt'
    var newPath = 'D:\\RCG\\To\\TestFile.txt'
    
    fs.rename(oldPath, newPath, function (err) {
        swal(err);
      if (err) throw err
      console.log('Successfully renamed - AKA moved!')
    });
}

function Create()
{
    try{
        var fs = require('fs');
       var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
       swal(baseUrl);

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

        var csvContent =  "Style Code,Page\r\n";
        for(var t = 0; t < JSONData.length;t++)
        {
            csvContent += JSONData[t].Product + ',' + JSONData[t].Length + "\r\n";
        }

        var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
        fs.writeFile(baseUrl, csvContent, function (err) 
        { 
                                if (err)
                                {
                                    swal('Operation failed'+err);
                                }                                
                                else
                                {
                                    swal('File created.');
                                }        
        });
    
    /*
    const fs = require('fs');
const https = require('https');
  
// URL of the image
const url = 'C:\\Users\\rcg.user\\Desktop\\INDD Files\\3-3-2021\\Catalog 165-180.indd';
  
https.get(url,(res) => {
    swal('url-'+url);
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
           //// swal(er);
    }
}


function GetProductDetails()
{   
    try
    {
       /// alert('GetProductDetails!');
        ///swal(process.env.APPDATA);
        var fs = require('fs');   
        var filePath =  process.env.APPDATA + '/RCG/Indesign/ProductDetails.txt';
        ///swal(filePath);
        if (!fs.existsSync(filePath)) 
        {  
           /// alert('Need to setup the json file!');
        swal({
            title: "Need to setup the json file!",
            text: "",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "",
            closeOnConfirm: true
          },
          function(){
            ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
          });

          LoadIndexSubPage();
          return;
        }
    
       
       var productDetails = fs.readFileSync(filePath,{encoding:'utf8'});
     ////swal(productDetails);
        if(productDetails != null && productDetails != '' && productDetails != undefined)
        {
            ///swal(productDetails);
            try
            {
               
              /*
                var data = jQuery.parseJSON(productDetails);
                productData = data.Products;
                indexFilePath = data.IndexFilePath;
                var newJson = [];
                for(var t = 0; t < productData.length;t++)
                {
                    swal(productData[t1].Product+'-'+productData[t1].Length+'-'+productData[t1].Weight+'-'+productData[t1].Price);
                    newJson.push(productData[t]); 
                }
                productData  =  JSON.stringify(newJson); */ 
                ///swal(productDetails);
       
            var indexFiles = productDetails.split(',');
            var index = jQuery.parseJSON(indexFiles[0]+'}');
            indexFilePath = index.IndexFilePath;
          ///  swal('indexFilePath-'+indexFilePath);
            var matches = productDetails.match(/\[(.*?)\]/);
            productData = jQuery.parseJSON(matches[0]); 
          ///  swal('productData-'+productData.length);
            var newJson = [];
           /// var content ='';
            for(var t = 0; t < productData.length;t++)
            {
                ///content += ', '+ productData[t].Product;
                newJson.push(productData[t]);               
            }
            productData  =  JSON.stringify(newJson);
          ///  swal(content);
                          
            }
            catch(er)
            {
                $('#spanEror').text('Error Invalid json format from -' + er);
                ////swal('Invalid json format');
                swal({
                    title: "Invalid json format!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "",
                    closeOnConfirm: true
                  },
                  function(){
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                  });
                LoadIndexSubPage();
                return;
            }

        try
        {           
            ///swal(productData);
            var fnAndArgs = 'GetProductDetailsFromIndesignFile(' + productData + ')';
            ///swal(fnAndArgs);
            CSLibrary.evalScript(fnAndArgs, function(result) 
            {  
                ///swal('GetProductDetailsFromIndesignFile in js-'+result);       
                if(result != null && result != '' && result != undefined )
                { 
                    var splitResults = result.split('T123T');
                    ////$('#spanEror').text('splitResults.length-'+splitResults.length);
                    if(splitResults.length == 3)
                    {                    
                        errorValues = splitResults[0];
                        warningValues = splitResults[1];
                        successValues = splitResults[2];
                        ///swal(successValues);
                        $('#btnScanningProceed').prop('disabled', false);
                        $('.maskedCircle').remove();
                        $('#divScanningProgressBar').css("width", "100%");
                        ///swal('Process completed');
                        /////swal("Process completed.", "", "success");                       
                                                
                            setTimeout(() => {
                                $('#btnScanningProceed').trigger('click');  
                            }, 650);
                    }
                    else
                    {
                       //// swal(result);
                       swal({
                        title: result,
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "",
                        closeOnConfirm: true
                      },
                      function(){
                        ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                      });
                      LoadIndexSubPage();      
                    }
                }
                else
                {
                    //swal('There is no product details!');   
                    swal({
                        title: result,
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "",
                        closeOnConfirm: true
                      },
                      function(){
                        ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                      });
                    LoadIndexSubPage();                
                }                
            });            
        }
                catch(er)
                {
                    $('#spanEror').text('Error from GetProductDetailsFromIndesignFile-' + er);
                    ///swal('Error from GetProductDetailsFromIndesignFile-'+er);
                }
        }
        else
        {
            //swal('There is no product details!');
            swal({
                title: "There is no product details!",
                text: "",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "",
                closeOnConfirm: true
              },
              function(){
                ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
              });
            LoadIndexSubPage();
        }

    
    
    
    //// swal(productData);
    }
    catch(er){
        $('#spanEror').text('Error from GetProductDetails-' + er);
        ////swal('Error from GetProductDetails' + er);
       }   
}

////////////// JSX CALLS  //////////////
function UpdateProductDetailsIntheIndesignFile()
{
    var fnAndArgs = 'UpdateProductDetailsIntheIndesignFile(' + productData + ')';
    ///swal(fnAndArgs);
    CSLibrary.evalScript(fnAndArgs, function(result) 
    {
        try
        {
            if(result.length > 0)
            {               
                if(result.indexOf('R34W') >-1)
                {
                    var resultSplit = result.split('R34W');
                    if(resultSplit.length > 1)
                    {
                        resultForIndex = resultSplit[0];  
                        indexFileName = resultSplit[1];  
                    }
                    
                }
                            
              ///  swal(result);
                $('#btnGotoIndexFileCreation').prop('disabled', false);
                $('.maskedCircle').remove();
                $('#divScanningProgressBar').css("width", "100%");
                ////swal('Updated successfully.');
               //// swal("Updated successfully.", "", "success");
            }
            else
            {
               /*
                swal({
                    title: "Result not found!",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "",
                    closeOnConfirm: true
                  },
                  function(){
                   
                  });
                  */
            }

            $.get( "../html/IndexFileCreation.html", function( data ) 
            {
                        $('#divPageContentDiv').html(data);
            });
        }
        catch(er)
        {
            $('#spanEror').text('Error from -' + er);
            ////swal('Error from UpdateProductDetailsIntheIndesignFile-'+ er);
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
        swal(err);
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
  swal(file); 
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
       /// swal('get'+response.statusCode);   
            var file = fs.createWriteStream(destinationUrl,"ancopy.png");
            response.pipe(file);
            swal(file);
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
            swal('downloadURI');
        }
*/

        /*
        Download('https://www.cryptocompare.com/media/19684/doge.png');
        
        function Download(url) {
           
            document.getElementById('my_iframe').src = url;
            swal(document.getElementById('my_iframe').src);
        };
*/

        /*
        var fs = require('fs'),
        request = require('request');
    
    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            swal('content-type:', res.headers['content-type']);
            swal('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    
        }); 
    };   
    
    download('https://www.cryptocompare.com/media/19684/doge.png', 'icons/taskks12.png', function(){
    swal('done');
    });
    */


    

/*
var http = require('http');
var fs = require('fs');

function pDownload(url, dest){
    swal('pDownload');
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
          swal('inside get');
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

          swal('click done');  
          */
          


    

/*
$(document).ready(function () { 
    ///swal('ready');
    $("#link").click(function (e) { 
        e.preventDefault(); 
          swal('link click');
        window.location.href = "D:\\RCG\\TestFile.txt"; 
    }); 
}); 
*/

function Test()
{
    var dirHome = process.env [process.platform =="win32"?"USERPROFILE":"HOME"];
    var dirDesktop = require ("path"). join (dirHome,"Desktop");
    swal(dir_desktop);
}

function JsonConvert()
{
 try
         {
  ///  swal('JsonConvert');
    var fs = require('fs');    
    var productDetails = fs.readFileSync(process.env.APPDATA + '/RCG/Indesign/ProductDetails.txt',{encoding:'utf8'});
  ///swal(productDetails);
     if(productDetails != null && productDetails != '' && productDetails != undefined)
     {
         ///swal(productDetails);
        
         var indexFiles = productDetails.split(',');
         var index = jQuery.parseJSON(indexFiles[0]+'}');
         swal(index.IndexFilePath);

            var matches = productDetails.match(/\[(.*?)\]/);
           var json = jQuery.parseJSON(matches[0]); ;
            for(var t = 0; t < json.length;t++)
            {
                swal(json[t].Product);
               
            }

            if (matches) {
                var submatch = matches[0];
            }
      
    }
   }
         catch(er)
         {
             /////swal(er);
            $('#spanEror').text('Error JsonConvert from -' + er);
         }
}

function TestNewPdtName()
{
var test ='AUF1022[AUF1022-18|ln]  $[AUF1022-18|pr][AUF1022-18|wt]g';

var fnAndArgs = "GetProductBNameFromIndesignText('" + test + "')";
///swal(fnAndArgs);
CSLibrary.evalScript(fnAndArgs, function(result) 
{  
    swal('result from jsx-'+test+' ->'+result);       
    
});

}

function SwalFn()
{
        try
        {
            ///swal('swal');
        swal("Here's a message!");
      /*  swal("Here's a message!", "It's pretty, isn't it?")
        swal("Good job!", "You clicked the button!", "success");
        swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
          },
          function(){
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
          });
          */


        }
        catch(er)
        {
           //// swal(er);
        $('#spanEror').text('Error swal from -' + er);
        }
}