var CSLibrary = new CSInterface();
var allProductData;
var wholeProductFromInDesign = [];
var errorValues = '';
var warningValues = '';
var successValues = '';
var resultForIndex = '';
var indexFilePath = '';
var indexFileName = '';



var successReturnValue = '';
var errorReturnValue = '';
var warningReturnValue = '';
var isItaNewPageForError = false;
var isItaNewPageForWarning = false;
var isItaNewPageForSucess = false;

$(document).ready(function () {
    try {
        /// swal(' js ready');

        LoadIndexSubPage();

        /////////////////////////////////////Index Page Start///////////////////////////////////////////////////


        $('#aTagProccedToScanningPage').live("click", function () {
            ///swal( 'swal from aTagProccedToScanningPage' );
            $.get("../html/ScanningInDesign.html", function (data) {
                $('#divPageContentDiv').html(data);
                ///GetProductDetails();
                GetProductDetailsNewMethod();
            });

        });
        ////////////////////////////////////Index Page End///////////////////////////////////////////////////////////////////



        /////////////////////////////////////Scanning Indesign Page Start/////////////////////////////////

        $('#btnIndesignScanCancel').live("click", function () {
            ///swal( 'swal from aTagProccedToScanningPage' );
            ////LoadIndexSubPage();
        });


        $('#btnScanningProceed').live("click", function () {
            ///swal( 'swal from aTagProccedToScanningPage' );
            $.get("../html/ScanningInDesignResult.html", function (data) {
                $('#divPageContentDiv').html(data);
                ////  alert('errorValues'+errorValues.length );
                if (errorValues != '' && errorValues.length > 0) {
                    try {
                        $('#btnErrorCopy').show();
                        $('#divErrors').show();
                        if (warningValues != '' && warningValues.length > 0) {
                            $('#btnWarningsCopy').show();
                            $('#divWarnings').show();
                        }
                        else {
                            $('#btnWarningsCopy').hide();
                            $('#divWarnings').remove();
                        }

                        $('#divSuccess').remove();
                        $('#pFooterForErrorWarning').show();
                        $('#pFooterForSuccess').remove();
                        ///  $('#divCopyCtrls').remove();
                        var rows = errorValues.split('R12W');
                        ////swal('rows.length'+rows.length);
                        var errorHtml = "<div class='row' style='color:#FF3E5A'> Errors</div>";
                        for (var row = 0; row < rows.length; row++) {
                            var eachRow = rows[row];
                            var columns = eachRow.split('C12L');
                            if (columns[0] == 1)///is it a new page
                            {
                                //product
                                if (row == 0) {
                                    errorHtml += "<div id='divErrorPage" + row + "' class='info-hd errorPage'>Page-" + columns[1] + "</div>";
                                }
                                else {
                                    errorHtml += "</ul> <div id='divErrorPage" + row + "' class='info-hd errorPage'>Page-" + columns[1] + "</div>";
                                }
                                errorHtml += "<ul style='display:none;' class='info-list error-list' id='ulErrors" + row + "'>";
                                errorHtml += "<li><img src='../img/error.png' class='tick'> <span class='PdtCls'>" + columns[2] + "</span></li>";
                            }
                            else {
                                //product
                                errorHtml += "<li><img src='../img/error.png' class='tick'> <span class='PdtCls'>" + columns[2] + "</span> </li>";
                            }
                        }

                        errorHtml += " </ul>";
                        $('#divErrors').html(errorHtml);
                    }
                    catch (er) {
                        $('#spanEror').text('Error btnScanningProceed from -' + er);
                        //// swal('btnScanningProceed click error- ' + er);
                    }
                }
                ////alert('warningValues'+warningValues.length);
                if (warningValues != '' && warningValues.length > 0) {
                    try {

                        $('#btnWarningsCopy').show();
                        $('#divWarnings').show();
                        if (errorValues != '' && errorValues.length > 0) {
                            $('#btnErrorCopy').show();
                            $('#divErrors').show();
                        }
                        else {
                            $('#btnErrorCopy').hide();
                            $('#divErrors').remove();
                        }

                        $('#divSuccess').remove();
                        $('#pFooterForErrorWarning').show();
                        $('#pFooterForSuccess').remove();
                        ///   $('#divCopyCtrls').show();


                        var rows = warningValues.split('R12W');
                        //// swal('rows.length-'+rows.length);
                        var warningHtml = "<div class='row' style='color:#F0B65B'>Warnings</div>";
                        for (var row = 0; row < rows.length; row++) {
                            var eachRow = rows[row];
                            var columns = eachRow.split('C12L');
                            ///swal(eachRow);
                            if (columns[0] == 1)///is it a new page
                            {
                                //product               
                                if (row == 0) {
                                    warningHtml += "<div id='divWarningPage" + row + "' class='info-hd warningPage'>Page-" + columns[1] + "</div>";
                                }
                                else {
                                    warningHtml += "</ul><div id='divWarningPage" + row + "' class='info-hd warningPage'>Page-" + columns[1] + "</div>";
                                }
                                warningHtml += " <ul style='display:none;' class='info-list error-list warring-list' id='ulWarnings" + row + "'>";
                                warningHtml += "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls'> " + columns[2] + "</span></li>";
                            }
                            else {
                                //product
                                warningHtml += "<li><img src='../img/warring.png' class='tick'> <span class='PdtCls'> " + columns[2] + "</span> </li>";
                            }
                            /*  if(row < 5)
                              {
                                  alert('row'+row+' value-'+eachRow+'COL[3]'+columns[3]);9847
                              }
                  */



                            var jsonData = JSON.parse(allProductData);
                            var data = $.grep(jsonData, function (item, index) {
                                return item.Product == columns[3];
                            });


                            if (data != null && data.length > 0) {
                                wholeProductFromInDesign.push(data[0]);
                            }

                        }
                        warningHtml += " </ul>";
                        $('#divWarnings').html(warningHtml);
                    }
                    catch (er) {

                        $('#spanEror').text('Error from btnScanningProceed-' + er);
                        ////swal('btnScanningProceed click warning ' + er);
                    }
                }

                ////alert('successValues.length-'+successValues.length);
                if (successValues != '' && successValues.length > 0 && warningValues.length == 0 && errorValues.length == 0) {
                    try {
                        $('#divErrors').remove();
                        $('#divWarnings').remove();
                        $('#divSuccess').show();
                        $('#pFooterForErrorWarning').remove();
                        $('#pFooterForSuccess').show();
                        $('#divCopyCtrls').remove();
                        var rows = successValues.split('R12W');
                        //// swal('rows.length-'+rows.length);
                        var successHtml = "<div class='row' style='color:#1DC198'>Success</div>";
                        for (var row = 0; row < rows.length; row++) {
                            var eachRow = rows[row];
                            var columns = eachRow.split('C12L');
                            ///swal(eachRow);
                            if (columns[0] == 1)///is it a new page
                            {
                                //product           
                                if (row == 0) {
                                    successHtml += "<div id='divSuccess" + row + "' class='info-hd successPage'>Page-" + columns[1] + "</div>";
                                }
                                else {
                                    successHtml += "</ul><div id='divSuccess" + row + "' class='info-hd successPage'>Page-" + columns[1] + "</div>";
                                }
                                successHtml += " <ul style='display:none;' class='info-list' id='ulSuccess" + row + "'>";
                                successHtml += "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls'> " + columns[2] + " </span> </li>";
                            }
                            else {
                                //product
                                successHtml += "<li><img src='../img/tick.png' class='tick'> <span class='PdtCls'> " + columns[2] + " </span></li>";
                            }
                        }
                        successHtml += " </ul>";
                        $('#divSuccess').html(successHtml);

                        if (successValues != '' && successValues.length > 0) {
                            for (var row = 0; row < rows.length; row++) {
                                var eachRow = rows[row];
                                var columns = eachRow.split('C12L');
                                var jsonData = JSON.parse(allProductData);
                                var data = $.grep(jsonData, function (item, index) {
                                    return item.Product == columns[3];
                                });
                                if (data != null && data.length > 0) {
                                    wholeProductFromInDesign.push(data[0]);
                                }
                            }
                        }
                    }
                    catch (er) {
                        $('#spanEror').text('Error from btnScanningProceed -' + er);
                        ////swal('btnScanningProceed click warning ' + er);
                    }
                }




            });

        });///$('#btnScanningProceed').live( "click", function()-- Close



        $('.errorPage').live("click", function () {
            var Str = $(this).attr('id');
            var toRemove = 'divErrorPage';
            var balPortion = Str.replace(toRemove, '');

            if ($('#ulErrors' + balPortion).is(':visible')) {
                $('#ulErrors' + balPortion).hide();
                $(this).removeClass('active');
            }
            else {
                $('#ulErrors' + balPortion).show();
                $(this).addClass('active');
            }
        });

        $('.warningPage').live("click", function () {
            var Str = $(this).attr('id');
            var toRemove = 'divWarningPage';
            var balPortion = Str.replace(toRemove, '');
            if ($('#ulWarnings' + balPortion).is(':visible')) {
                $(this).removeClass('active');
                $('#ulWarnings' + balPortion).hide();
            }
            else {
                $('#ulWarnings' + balPortion).show();
                $(this).addClass('active');
            }
        });

        $('.successPage').live("click", function () {
            var Str = $(this).attr('id');
            var toRemove = 'divSuccess';
            var balPortion = Str.replace(toRemove, '');
            if ($('#ulSuccess' + balPortion).is(':visible')) {
                $(this).removeClass('active');
                $('#ulSuccess' + balPortion).hide();
            }
            else {
                $('#ulSuccess' + balPortion).show();
                $(this).addClass('active');
            }
        });


        $('#btnWarningsCopy').live("click", function () {

            var content = "";
            $("div[id^='divWarningPage']").each(function (index, item) {
                content += $(this).html() + '<br>';
                var Str = $(this).attr('id');
                var toRemove = 'divWarningPage';
                var balPortion = Str.replace(toRemove, '');
                $("#ulWarnings" + balPortion + " .PdtCls").each(function () {
                    content += $(this).text() + '<br>';
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


        $('#btnErrorCopy').live("click", function () {

            var content = "";
            $("div[id^='divErrorPage']").each(function (index, item) {
                content += $(this).html() + '<br>';
                var Str = $(this).attr('id');
                var toRemove = 'divErrorPage';
                var balPortion = Str.replace(toRemove, '');
                $("#ulErrors" + balPortion + " .PdtCls").each(function () {
                    content += $(this).text() + '<br>';
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
        $('#btnCancelScanningResult').live("click", function () {
            ///swal( 'swal from aTagProccedToScanningPage' );
            /* $.get( "../html/ScanningInDesign.html", function( data ) 
             {
                         $('#divPageContentDiv').html( data );
             });
         */
        });

        ////////////////////////////////////Scanning Indesign Result End/////////////////////////////////////////////////

        /////////////////////////////////// Scanning Result Statrt /////////////////////////////////////////////////////
        $('#btnProceedScanning').live("click", function () {
            $.get("../html/CommunicatingWithAppAndIndesign.html", function (data) {
                $('#divPageContentDiv').html(data);
                /////swal('successValues'+successValues);
                UpdateProductDetailsIntheIndesignFile();

            });
        });

        /////////////////////////////////// Scanning Result End /////////////////////////////////////////////////////

        /////////////////////////////////// Go to index file creation Statrt /////////////////////////////////////////////////////
        $('#btnGotoIndexFileCreation').live("click", function () {
            $.get("../html/IndexFileCreation.html", function (data) {
                $('#divPageContentDiv').html(data);

            });
        });
        $('#btnOk').live("click", function () {
            window.close();
        });

        $('#btnDownloadIndexFile').live("click", function () {
            /////swal('btnDownloadIndexFile'+indexFilePath);
            if (indexFilePath == '' || indexFilePath == null || indexFilePath == undefined) {
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
                    function () {
                        ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    });
            }
            else {
                var fs = require('fs');
                if (fs.existsSync(indexFilePath)) {
                }
                else {
                    ////swal('Index file path does not exists(' + indexFilePath + ')');
                    var dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
                    indexFilePath = require("path").join(dirHome, "Desktop");
                }
                //// swal('resultForIndex'+resultForIndex);
                if (resultForIndex != '' && resultForIndex != null && resultForIndex != undefined) {
                    var rows = resultForIndex.split('R12W');
                    ////swal('rows.length'+rows.length);
                    var csvContent = "SKU,Page\r\n";
                    for (var row = 0; row < rows.length; row++) {
                        var eachRow = rows[row];
                        if (eachRow != '' && eachRow != null && eachRow != undefined) {
                            var columns = eachRow.split('C12L');
                            csvContent += columns[0] + ',' + columns[1] + "\r\n";
                        }
                    }
                    ////  alert(indexFileName);

                    fs.writeFile(indexFilePath + "\\" + indexFileName, csvContent, function (er) {
                        if (er) {
                            swal({
                                title: "Operation failed!" + er,
                                text: "",
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "",
                                closeOnConfirm: true
                            },
                                function () {
                                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                                });
                            $('#spanEror').text('Error from btnDownloadIndexFile -' + er);
                        }
                        else {
                            swal("Index file downloaded (" + (indexFilePath + "\\" + indexFileName) + ")", "", "success");
                            ////swal('Index file downloaded(' + indexFilePath + ')');
                        }
                    });
                }
                else {
                    swal({
                        title: "There is no data to create the index file",
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "",
                        closeOnConfirm: true
                    },
                        function () {
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
    catch (er) {
        $('#spanEror').text('Error from ready function-' + er);
        ////swal('Error from ready function-' + er);       
    }
});

function LoadIndexSubPage() {
    $.get("../html/indexSub.html", function (data) {


        $('#divPageContentDiv').html(data);
    });
}

function DownloadFile() {
    var fs = require('fs')

    var oldPath = 'D:\\RCG\\From\\TestFile.txt'
    var newPath = 'D:\\RCG\\To\\TestFile.txt'

    fs.rename(oldPath, newPath, function (err) {
        swal(err);
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
    });
}

function Create() {
    try {
        var fs = require('fs');
        var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
        swal(baseUrl);

        var JSONData = [
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

        var csvContent = "Style Code,Page\r\n";
        for (var t = 0; t < JSONData.length; t++) {
            csvContent += JSONData[t].Product + ',' + JSONData[t].Length + "\r\n";
        }

        var baseUrl = process.env.APPDATA + '\\RCG\\index.csv';
        fs.writeFile(baseUrl, csvContent, function (err) {
            if (err) {
                swal('Operation failed' + err);
            }
            else {
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
    catch (er) {
        $('#spanEror').text('Error from -' + er);
        //// swal(er);
    }
}


function GetProductDetails() {
    try {
        var strData = '';
        /// alert('GetProductDetails!');
        ///swal(process.env.APPDATA);
        var fs = require('fs');
        var filePath = process.env.APPDATA + '/RCG/Indesign/ProductDetails.txt';
        ///swal(filePath);
        if (!fs.existsSync(filePath)) {
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
                function () {
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                });

            LoadIndexSubPage();
            return;
        }


        var productDetails = fs.readFileSync(filePath, { encoding: 'utf8' });
        /// alert(productDetails);
        if (productDetails != null && productDetails != '' && productDetails != undefined) {
            /////  swal(productDetails);
            try {

                var pdt = jQuery.parseJSON(productDetails);
                ////alert(pdt.Products);
                productData = pdt.Products;
                indexFilePath = pdt.IndexFilePath;
                var newJson = [];
                /// var content ='';
                for (var t = 0; t < productData.length; t++) {
                    ///content += ', '+ productData[t].Product;
                    newJson.push(productData[t]);
                    if (strData.length > 0) {
                        strData += ',' + productData[t].Product;
                    }
                    else {
                        strData += productData[t].Product;
                    }
                }
                productData = JSON.stringify(newJson);
                indexFilePath = pdt.IndexFilePath;
                /// swal('indexFilePath-'+indexFilePath);
                /*
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
                */

            }
            catch (er) {
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
                    function () {
                        ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    });
                LoadIndexSubPage();
                return;
            }

            try {
                //// var strData  =  JSON.stringify(newJson);
                ///swal(productData);


                ///         alert(strData)
                var fnAndArgs = 'GetProductDetailsFromIndesignFile(' + productData + ')';
                ///swal(fnAndArgs);
                CSLibrary.evalScript(fnAndArgs, function (result) {
                    ///swal('GetProductDetailsFromIndesignFile in js-'+result);       
                    if (result != null && result != '' && result != undefined) {
                        var splitResults = result.split('T123T');
                        ////$('#spanEror').text('splitResults.length-'+splitResults.length);
                        if (splitResults.length == 3) {
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
                        else {
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
                                function () {
                                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                                });
                            LoadIndexSubPage();
                        }
                    }
                    else {
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
                            function () {
                                ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                            });
                        LoadIndexSubPage();
                    }
                });
            }
            catch (er) {
                $('#spanEror').text('Error from GetProductDetailsFromIndesignFile-' + er);
                ///swal('Error from GetProductDetailsFromIndesignFile-'+er);
            }
        }
        else {
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
                function () {
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                });
            LoadIndexSubPage();
        }




        //// swal(productData);
    }
    catch (er) {
        $('#spanEror').text('Error from GetProductDetails-' + er);
        ////swal('Error from GetProductDetails' + er);
    }
}

////////////// JSX CALLS  //////////////
function UpdateProductDetailsIntheIndesignFile() {
    //// alert('wholeProductFromInDesign-'+wholeProductFromInDesign.length);
    var data = JSON.stringify(wholeProductFromInDesign);
    var fnAndArgs = 'UpdateProductDetailsIntheIndesignFile(' + data + ')';
    ///swal(fnAndArgs);
    CSLibrary.evalScript(fnAndArgs, function (result) {
        try {
            if (result.length > 0) {
                if (result.indexOf('R34W') > -1) {
                    var resultSplit = result.split('R34W');
                    if (resultSplit.length > 1) {
                        resultForIndex = resultSplit[0];
                        indexFileName = resultSplit[1];
                    }

                    $('#btnGotoIndexFileCreation').prop('disabled', false);
                    $('.maskedCircle').remove();
                    $('#divScanningProgressBar').css("width", "100%");
                    $.get("../html/IndexFileCreation.html", function (data) {
                        setTimeout(() => {
                            $('#divPageContentDiv').html(data);
                        }, 650);

                    });

                }
                else {
                    swal({
                        title: result,
                        text: "",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "",
                        closeOnConfirm: true
                    },
                        function () {
                            GotoHomePage();
                        });


                }
            }
            else {
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
        }
        catch (er) {
            $('#spanEror').text('Error from UpdateProductDetailsIntheIndesignFile-' + er);
            ////swal('Error from UpdateProductDetailsIntheIndesignFile-'+ er);
        }
    });
}



///////////////// 30 April 2021


function GetProductDetailsNewMethod() {
    try {
        var strData = '';
        /// alert('GetProductDetails!');
        ///swal(process.env.APPDATA);
        var fs = require('fs');
        var filePath = process.env.APPDATA + '/RCG/Indesign/ProductDetails.txt';
        ///swal(filePath);
        if (!fs.existsSync(filePath)) {
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
                function () {
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                });

            LoadIndexSubPage();
            return;
        }


        allProductData = fs.readFileSync(filePath, { encoding: 'utf8' });
        /// alert(productDetails);
        if (allProductData != null && allProductData != '' && allProductData != undefined) {
            /////  swal(productDetails);
            try {

                var pdt = jQuery.parseJSON(allProductData);
                ////alert(pdt.Products);
                allProductData = pdt.Products;
                indexFilePath = pdt.IndexFilePath;
                var newJson = [];
                /// var content ='';
                for (var t = 0; t < allProductData.length; t++) {
                    ///content += ', '+ productData[t].Product;
                    newJson.push(allProductData[t]);

                }
                allProductData = JSON.stringify(newJson);
                indexFilePath = pdt.IndexFilePath;


            }
            catch (er) {
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
                    function () {
                        ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    });
                LoadIndexSubPage();
                return;
            }

            try {
                var fnAndArgs = 'GetProductDetailsFromIndesignFileNewMethod()';
                ///swal(fnAndArgs);
                CSLibrary.evalScript(fnAndArgs, function (result) {
                    ////alert(result);       
                    if (result != null && result != '' && result != undefined && (result.indexOf('C12L') > -1 || result.indexOf('R12W') > -1) ) {
                        //// alert('result length-'+result.length);
                        var newResult = FindingSuccessErrorWarnings(result);
                        ListingAllSuccessErrorWarnings(newResult);
                        ///alert('newResult-'+newResult.length);

                    }
                    else {
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
                            function () {
                                ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                            });
                        LoadIndexSubPage();
                    }
                });
            }
            catch (er) {
                $('#spanEror').text('Error from GetProductDetailsFromIndesignFile-' + er);
                ///swal('Error from GetProductDetailsFromIndesignFile-'+er);
            }
        }
        else {
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
                function () {
                    ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
                });
            LoadIndexSubPage();
        }

        //// swal(productData);
    }
    catch (er) {
        $('#spanEror').text('Error from GetProductDetailsNewMethod-' + er);
        WriteLog('Error from GetProductDetailsNewMethod-' + er);
        ////swal('Error from GetProductDetails' + er);
    }
}

function FindingSuccessErrorWarnings(result) {
    var rows = result.split('R12W');
    var fullPdtContentFromInDesign = '';
    var pageName = '';
    var isItANewPage = false;
    ////alert('rows.length'+rows.length);
    var pdtFromInDesign = '';
    for (var row = 0; row < rows.length; row++) {
        try {
            ////alert('row-'+row);

            ///var per = rows.length/row
            $('#divScanningProgressBar').css("width", row + "%");

            pdtFromInDesign = '';
            fullPdtContentFromInDesign = '';
            pageName = '';
            var eachRow = rows[row];
            var columns = eachRow.split('C12L');
            if (columns[0] == 1)///is it a new page
            {
                isItANewPage = columns[0];
                isItaNewPageForError = isItANewPage;
                isItaNewPageForSucess = isItANewPage;
                isItaNewPageForWarning = isItANewPage;
            }

            if (columns[1] != '')///pageName
            {
                pageName = columns[1];
            }

            if (columns[2] != '')///fullPdtContentFromInDesign
            {
                fullPdtContentFromInDesign = columns[2];
            }


            ////  alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' pageName-'+pageName+'isItANewPage-'+isItANewPage);




            /*	if(pageName != '11')
                    {
                        continue;
                    }
                    if(fullPdtContentFromInDesign.indexOf('RC11911') == -1 )
                    {
                        continue;
                    }*/


            //blockOtherSKU- Get
            var leftIndex = fullPdtContentFromInDesign.indexOf('[');
            var rightIndex = fullPdtContentFromInDesign.indexOf(']');
            var lengthIndex = fullPdtContentFromInDesign.indexOf('|ln');
            var weightIndex = fullPdtContentFromInDesign.indexOf('|wt');
            var priceIndex = fullPdtContentFromInDesign.indexOf('|pr');

            if (leftIndex == rightIndex && leftIndex == -1)
            ///&& lengthIndex == -1 && weightIndex == -1 && priceIndex == -1)
            {
                continue;
                ///alert(fullPdtContentFromInDesign+' Continue'+'leftIndex-'+leftIndex+'rightIndex= '+rightIndex);			
            }

            /*					
                
                    
                if(fullPdtContentFromInDesign.indexOf('ER11385') > -1)
                {
                    alert('Found - '+fullPdtContentFromInDesign);
                }*/
            ///alert('fullPdtContentFromInDesign page '+fullPdtContentFromInDesign);			
            ///$[FOX080-18|pr]
            var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
            var squareIndex = fullPdtContentFromInDesign.indexOf('[');
            ///alert('dollarIndex-' + dollarIndex + 'squareIndex' + squareIndex);
            if (dollarIndex == 0 && squareIndex == 1) {
                var matches = fullPdtContentFromInDesign.match(/\[(.*?)\]/);
                ///alert('matches.length-'+matches.length);
                if (matches != null && matches.length > 0) {
                    for (var inc = 0; inc < matches.length; inc++) {
                        ///alert(sku + ' | ' + inc + ' -> ' + matches[inc] );
                        if (inc == 1) {
                            var skuSplits = matches[inc].split('|');
                            if (skuSplits.length > 1) {
                                ///pdtFromInDesign = '[' + skuSplits[0] + ']';
                                pdtFromInDesign = skuSplits[0];
                            }
                        }
                    }
                }
                else {
                    if (fullPdtContentFromInDesign.indexOf('[') > -1 && fullPdtContentFromInDesign.indexOf(']') == -1) {
                        /// $[PKBX053-16|pr
                        if (fullPdtContentFromInDesign.indexOf('|') > -1) {
                            var matches = fullPdtContentFromInDesign.match(/\[(.*?)\|/);
                            var subMatch = '';
                            if (matches) {
                                subMatch = matches[1];
                                ///alert('subMatch in error-' + subMatch);
                                //pdtFromInDesign = '[' + subMatch + ']';
                                pdtFromInDesign = subMatch;
                            }
                            else {
                                pdtFromInDesign = fullPdtContentFromInDesign;
                            }
                        }
                    }
                    else if (fullPdtContentFromInDesign.indexOf('[') == -1 && fullPdtContentFromInDesign.indexOf(']') > -1) {
                        /// $PKBX053-16|pr]
                        if (fullPdtContentFromInDesign.indexOf('|') > -1) {
                            var matches = fullPdtContentFromInDesign.split('|');
                            if (matches.length > 1) {
                                ///pdtFromInDesign = '[' + matches[0].replace('$','')+ ']';
                                pdtFromInDesign = matches[0].replace('$', '');
                            }
                        }
                    }
                    else {
                        pdtFromInDesign = fullPdtContentFromInDesign;
                    }

                }
                ////alert('GetProductNameFromIndesignTextForTableFormat normal called');
                ////pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
            }
            else {
                ////alert('Normal format called');				
                pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
                /// alert('pdtFromInDesign-'+pdtFromInDesign);
            }

            ////alert('Before format - '+fullPdtContentFromInDesign+' | pdtFromInDesign-'+pdtFromInDesign+' Length - '+pdtFromInDesign.length);				
            pdtFromInDesign = Trim(pdtFromInDesign);
            ////alert('after trim format - '+fullPdtContentFromInDesign+' | pdtFromInDesign-'+pdtFromInDesign+' Length - '+pdtFromInDesign.length);				
            if (pdtFromInDesign == '') {
                ///alert(fullPdtContentFromInDesign+' is Empty')
                continue;
            }
            productErrorPortion = '';
            ///alert('fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'NORMAL'+'pdtFromInDesign-'+pdtFromInDesign);
            /*	*/

            //// alert('Normal fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'pageName-'+pageName);

            productStatus = 101;
            /// 101 -> Product In Success,
            /// 102 -> Product In Warning,
            /// 103 -> Product In Error,			
            ///alert('productData.length'+productData.length);

            if (CheckAnyErrorInProduct(fullPdtContentFromInDesign)) {
                productStatus = 103;
                /// 103 -> Product In Error,									
                //// alert('Error occurred ');								
            }

            else {


                var productData = $.grep(allProductData, function (item, index) {
                    return item.Product == pdtFromInDesign;
                });


                ////  alert('productData-'+productData.length);


                if (productData != null && productData.length == 0) {
                    productStatus = 102;	/// 102 -> Product In Warning,
                    productErrorPortion = pdtFromInDesign + ' - Product missing';
                }
                else {

                    for (var g = 0; g < productData.length; g++) {
                        try {
                            newTextForIndesign = '';
                            var pdtFromAppData = productData[g].Product;
                            var lengthFromAppData = productData[g].Length;
                            ///alert('pdtFromAppData->'+pdtFromAppData+' |pdtFromInDesign- '+pdtFromInDesign);
                            var weightFromAppData = productData[g].Weight;
                            var rateFromAppData = productData[g].Price;
                            //alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData ->'+pdtFromAppData);
                            //pdtFromInDesign = Trim(pdtFromInDesign);
                            pdtFromInDesign = TrimInMiddle(pdtFromInDesign);

                            //alert('pdtFromInDesign-'+pdtFromInDesign+',pdtFromInDesign len-'+pdtFromInDesign.length+',pdtFromAppData ->'+pdtFromAppData+',pdtFromAppData len ->'+pdtFromAppData.length);
                            if (pdtFromInDesign == pdtFromAppData) {
                                ///alert('Product found '+pdtFromInDesign+' | fullPdtContentFromInDesign-'+fullPdtContentFromInDesign);
                                /// Product found in indesign	

                                /////GetAllWarningsFromTheIndesignProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
                                if (CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData)) {
                                    ///alert('CheckAnyWarningInProduct calling frm page normal');
                                    productStatus = 102;///Warning with skip
                                    ///alert('fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus);					
                                    //alert(fullPdtContentFromInDesign + ' Product In Warning');									
                                    /// break;
                                }
                                ///alert(fullPdtContentFromInDesign + ' Product In Success');
                                ///productStatus = 101;	
                                /// break;
                            } // found if close
                            else {
                                productStatus = 102;	/// 102 -> Product In Warning,
                                productErrorPortion = pdtFromInDesign + ' - Product missing';
                                ///alert('in warning');
                            }
                            ///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
                        }
                        catch (er) {
                            alert('Normal section-' + er);
                        }

                    }///productData loop
                }///else 

            }

            //// alert('from normal fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)

            if (productStatus == 101) /// 101 -> Product In Success,
            {
                ////alert(pdtFromInDesign + 'Product In Success');					
                if (successReturnValue.length == 0) {
                    successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L" + pdtFromInDesign;
                }
                else {
                    successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L" + pdtFromInDesign;
                }
                isItaNewPageForSucess = false;
                ////alert('successReturnValue-'+successReturnValue);
            }
            else if (productStatus == 102) //// Product missing from group 	/// 102 -> Product In Warning
            {
                ////alert(fullPdtContentFromInDesign + ' Product In Warning');						
                ///var pdt = GetProductFromWarning(fullPdtContentFromInDesign);
                if (warningReturnValue.length == 0) {
                    warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L" + pdtFromInDesign;
                }
                else {
                    warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L" + pdtFromInDesign;
                }
                isItaNewPageForWarning = false;
            }
            else if (productStatus == 103) /// 101 -> Product In Error,
            {
                //var pdt =	GetProductFromError(fullPdtContentFromInDesign);
                pdt = fullPdtContentFromInDesign;
                if (errorReturnValue.length == 0) {
                    errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L" + pdtFromInDesign;
                }
                else {
                    errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L" + pdtFromInDesign;
                }
                isItaNewPageForError = false;
            }

        }
        catch (er) {
            alert('Errror from row ' + row + ' errr-' + er);

        }
    }//row closing

    var newResult = (errorReturnValue + "T123T" + warningReturnValue + "T123T" + successReturnValue);
    return newResult;
}

function ListingAllSuccessErrorWarnings(newResult) {
    var splitResults = newResult.split('T123T');
    if (splitResults.length == 3) {
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
    else {
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
            function () {
                ////swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });
        LoadIndexSubPage();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

function CheckAnyErrorInProduct(fullPdtContentFromInDesign) {

    /*	alert('CheckAnyErrorInProduct');
    
        if(fullPdtContentFromInDesign.indexOf('RW020-18') == -1 )
        {
            return;
        }
        */
    productErrorPortion = fullPdtContentFromInDesign;
    if (fullPdtContentFromInDesign == ''
        || fullPdtContentFromInDesign == null
        || fullPdtContentFromInDesign == undefined) {
        return true;
    }


    var countOfLeftSqure = 0;
    var countOfRightSqure = 0;
    for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) {
        if (fullPdtContentFromInDesign[inc] == '[') {
            countOfLeftSqure++;
        }
        else if (fullPdtContentFromInDesign[inc] == ']') {
            countOfRightSqure++;
        }
    }

    /// alert('countOfLeftSqure-'+countOfLeftSqure+' | countOfRightSqure-'+countOfRightSqure)
    if (countOfLeftSqure != countOfRightSqure) {
        return true;
    }


    var lengthPortion = '';
    var weightPortion = '';
    var pricePortion = '';
    var content = '';
    var hasLeftFound = false;
    var hasRightFound = false;
    ///alert('start scanning '+fullPdtContentFromInDesign);
    for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) {
        ///alert(fullPdtContentFromInDesign[inc]);

        if (fullPdtContentFromInDesign[inc] == '[') {
            ///alert('[ found content-'+ content);
            hasLeftFound = true;
            content = '';
            continue;
        }

        if (fullPdtContentFromInDesign[inc] == ']') {
            ///alert('] found content-'+ content);
            hasRightFound = true;
            hasLeftFound = false;
        }

        if (hasRightFound) {
            if (content.indexOf('ln') > -1) {
                lengthPortion = content;
            }
            else if (content.indexOf('wt') > -1) {
                weightPortion = content;
            }
            else if (content.indexOf('pr') > -1) {
                pricePortion = content;
            }

            hasLeftFound = false;
            hasRightFound = false;
            content = '';
        }

        if (hasLeftFound) {
            content += fullPdtContentFromInDesign[inc];
        }
    }

    ///alert('lengthPortion-'+lengthPortion+' |weightPortion- '+weightPortion+' |pricePortion- '+pricePortion+'lengthFromAppData-'+lengthFromAppData+' |weightFromAppData-'+weightFromAppData+' | rateFromAppData-'+rateFromAppData);
    if (lengthPortion.length > 0 && lengthPortion.indexOf('|') == -1) {
        return true;
    }
    if (weightPortion.length > 0 && weightPortion.indexOf('|') == -1) {
        ///alert('weightPortion-'+weightPortion+' | weightFromAppData-'+weightFromAppData);
        ///alert('ln missing'+subMatch);		
        return true;
    }
    if (pricePortion.length > 0 && pricePortion.indexOf('|') == -1) {
        ///alert('pricePortion-'+pricePortion+' | rateFromAppData-'+rateFromAppData);
        ///alert('wt missing-'+subMatch);		
        return true;
    }
    var totalSectionsInPdt = 0;
    if (lengthPortion.length > 0) {
        totalSectionsInPdt++;
    }
    if (weightPortion.length > 0) {
        totalSectionsInPdt++;
    }
    if (pricePortion.length > 0) {
        totalSectionsInPdt++;
    }
    ///alert('totalSectionsInPdt-'+totalSectionsInPdt+' | (countOfLeftSqure + countOfRightSqure)'+(countOfLeftSqure + countOfRightSqure))
    if ((totalSectionsInPdt * 2) != (countOfLeftSqure + countOfRightSqure)) {
        return true;
    }

    /////////////////////////////////////////////////////////////////////////	
    var spaceSplits = fullPdtContentFromInDesign.split(' ');
    ////alert( spaceSplits.length);
    var identifierCount = 0;
    var leftRightSqureBracketCnt = 0;
    for (var inc = 0; inc < spaceSplits.length; inc++) {
        var item = spaceSplits[inc];
        ////alert(item);
        if (item == '' || item == null || item == undefined) {
            continue;
        }

        if (item.indexOf('|ln') > -1) {
            identifierCount++;
        }
        else if (item.indexOf('|wt') > -1) {
            identifierCount++;
        }
        else if (item.indexOf('|pr') > -1) {
            identifierCount++;
        }

        if (item.indexOf('[') > -1) {
            leftRightSqureBracketCnt++;
        }

        if (item.indexOf(']') > -1) {
            leftRightSqureBracketCnt++;
        }
    }

    //// Error
    if ((identifierCount * 2) != leftRightSqureBracketCnt) {
        return true;
    }
}

//////////////////////////////////////
function CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData) {
    /* 
    ///alert('CheckAnyWarningInProduct');
       if(fullPdtContentFromInDesign.indexOf('RC6979-07') == -1 )
       {
           ///return;
       }	
       */
    productErrorPortion = fullPdtContentFromInDesign;
    if (fullPdtContentFromInDesign == ''
        || fullPdtContentFromInDesign == null
        || fullPdtContentFromInDesign == undefined) {
        return true;
    }

    var lengthPortion = '';
    var weightPortion = '';
    var pricePortion = '';
    var content = '';
    var hasLeftFound = false;
    var hasRightFound = false;
    ///alert('start scanning '+fullPdtContentFromInDesign);
    for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) {
        ///alert(fullPdtContentFromInDesign[inc]);

        if (fullPdtContentFromInDesign[inc] == '[') {
            ///alert('[ found content-'+ content);
            hasLeftFound = true;
            content = '';
            continue;
        }

        if (fullPdtContentFromInDesign[inc] == ']') {
            ///alert('] found content-'+ content);
            hasRightFound = true;
            hasLeftFound = false;
        }

        if (hasRightFound) {
            if (content.indexOf('ln') > -1) {
                lengthPortion = content;
            }
            else if (content.indexOf('wt') > -1) {
                weightPortion = content;
            }
            else if (content.indexOf('pr') > -1) {
                pricePortion = content;
            }

            hasLeftFound = false;
            hasRightFound = false;
            content = '';
        }

        if (hasLeftFound) {
            content += fullPdtContentFromInDesign[inc];
        }
    }

    ///alert('lengthPortion-'+lengthPortion+' |weightPortion- '+weightPortion+' |pricePortion- '+pricePortion+'lengthFromAppData-'+lengthFromAppData+' |weightFromAppData-'+weightFromAppData+' | rateFromAppData-'+rateFromAppData);
    if (lengthPortion.length > 0 && (lengthFromAppData == '' || lengthFromAppData == null || lengthFromAppData == undefined)) {
        ///alert('lengthPortion-'+lengthPortion+' | lengthFromAppData-'+lengthFromAppData);
        productErrorPortion = '[' + lengthPortion + '] - Length missing';
        return true;
    }
    else if (weightPortion.length > 0 && (weightFromAppData == '' || weightFromAppData == null || weightFromAppData == undefined)) {
        ///alert('weightPortion-'+weightPortion+' | weightFromAppData-'+weightFromAppData);
        ///alert('ln missing'+subMatch);
        productErrorPortion = '[' + weightPortion + '] - Weight missing';
        return true;
    }
    else if (pricePortion.length > 0 && (rateFromAppData == '' || rateFromAppData == null || rateFromAppData == undefined)) {
        ///alert('pricePortion-'+pricePortion+' | rateFromAppData-'+rateFromAppData);
        ///alert('wt missing-'+subMatch);
        productErrorPortion = '[' + pricePortion + '] - Price Missing';
        return true;
    }

    return false;
}


function Trim(strText) {
    var newString = '';
    if (strText == '') {
        return newString;
    }

    for (var inc = 0; inc < strText.length; inc++) {
        if (inc == 0 && strText[inc] == '') {
            ///alert('Start space');
            continue;
        }

        if (inc == (strText.length - 1) && strText[inc] == '') {
            ///alert('End space');
            continue;
        }

        newString += strText[inc];

    }

    return newString;
}

function TrimInMiddle(strText) {
    var newString = '';
    if (strText == '') {
        return newString;
    }

    for (var inc = 0; inc < strText.length; inc++) {

        if (strText[inc] != '' && strText[inc] != null || strText[inc] != undefined) {
            newString += strText[inc];
        }
        else {
            ///alert('strText-'+strText+'->'+strText[inc]);

        }
    }

    return newString;
}

function GetProductNameFromIndesignText(fullPdtContentFromInDesign) {
    var inDesignText = '';
    try {
        /// FOX080  0.8mm [FOX080-18|ln] [FOX080-18|wt]g (0.09 gr/inch)
        /// RC6980[RC6980-07|ln] [RC6980-07|wt]g  $[RC6980-07|pr]
        var spaceSplits = fullPdtContentFromInDesign.split(' ');
        ////alert( spaceSplits.length);
        for (var inc = 0; inc < spaceSplits.length; inc++) {
            var item = spaceSplits[inc];
            ///alert('Each item-'+item);
            if (item == '' || item == null || item == undefined) {
                continue;
            }

            var matches = item.match(/\[(.*?)\]/);
            var sku = '';
            var subMatch = '';
            if (matches) {
                subMatch = matches[1];
                ///alert('matches fount in -' + subMatch);
                if (subMatch.indexOf('ln') > -1 && subMatch.indexOf('|ln') > -1) {
                    var splitItem = subMatch.split('|ln');
                    if (splitItem.length > 1) {
                        inDesignText = splitItem[0];
                        ///	alert('LN1 inDesignText'+inDesignText);
                    }
                }
                else if (subMatch.indexOf('ln') > -1) {
                    var splitItem = subMatch.split('ln');
                    if (splitItem.length > 1) {
                        if (splitItem[0].indexOf('|')) {
                            var item = splitItem[0].split('|');
                            if (item.length > 1) {
                                inDesignText = item[0];
                                ///alert('LN2 inDesignText'+inDesignText);
                            }
                        }
                    }
                }

                if (subMatch.indexOf('wt') > -1 && subMatch.indexOf('|wt') > -1) {
                    var splitItem = subMatch.split('|wt');
                    if (splitItem.length > 1) {
                        inDesignText = splitItem[0];
                        ///alert('wt1 inDesignText'+inDesignText);
                    }
                }
                else if (subMatch.indexOf('wt') > -1) {
                    var splitItem = subMatch.split('wt');
                    if (splitItem.length > 1) {
                        if (splitItem[0].indexOf('|')) {
                            var item = splitItem[0].split('|');
                            if (item.length > 1) {
                                inDesignText = item[0];
                                ///alert('wt2 inDesignText'+inDesignText);
                            }
                        }
                    }
                }
                else if (subMatch.indexOf('pr') > -1) {
                    var splitItem = subMatch.split('pr');
                    if (splitItem.length > 1) {
                        if (splitItem[0].indexOf('|')) {
                            var item = splitItem[0].split('|');
                            if (item.length > 1) {
                                inDesignText = item[0];
                                ///alert('pr inDesignText'+inDesignText);
                            }
                        }
                    }
                }
            }
        }

        ////alert('second part');
        if (inDesignText == '') {
            ////alert('In second part');
            ///RC11866[RC11866-07|ln [RC11866-07|wtg $[RC11866-07|pr
            for (var inc = 0; inc < spaceSplits.length; inc++) {
                var item = spaceSplits[inc];
                ///alert('Each item-'+item);
                if (item.indexOf('wt') > -1 && item.indexOf('[') > -1) {
                    inDesignText = '';
                    var start = false;
                    for (var inc = 0; inc < item.length; inc++) {
                        if (item[inc] == '[') {
                            start = true;
                            continue;
                        }
                        else if (item[inc] == '|' || (item[inc] == 'w' && item[(inc + 1)] == 't')) {
                            start = false;
                            break;
                        }

                        if (start) {
                            inDesignText += item[inc];
                        }
                    }
                }
                else if (item.indexOf('wt') > -1) {
                    if (item.indexOf('|wt') > -1) {
                        var weights = item.split('|wt');
                        if (weights.length > 0) {
                            inDesignText = ReplaceCharacterFromString(weights[0], '[');
                            ////alert('weights1 inDesignText-'+inDesignText);
                            break;
                        }
                    }
                    else if (item.indexOf('wt') > -1) {
                        var weights = item.split('wt');
                        if (weights.length > 0) {
                            inDesignText = ReplaceCharacterFromString(weights[0], '[');
                            ////alert('weights2 inDesignText-'+inDesignText);
                            break;
                        }
                    }
                }
                else if (item.indexOf('pr') > -1) {
                    //$[RC11866-07|pr
                    if (item.indexOf('|pr') > -1) {
                        var prices = item.split('|pr');
                        if (prices.length > 0) {
                            inDesignText = ReplaceCharacterFromString(prices[0], '[');
                            inDesignText = ReplaceCharacterFromString(inDesignText, ']');
                            inDesignText = ReplaceCharacterFromString(inDesignText, '$');
                            ////alert('prices1 inDesignText-'+inDesignText);
                            break;
                        }
                    }
                    else if (item.indexOf('pr') > -1) {
                        var prices = item.split('pr');
                        if (prices.length > 0) {
                            inDesignText = ReplaceCharacterFromString(prices[0], '[');
                            inDesignText = ReplaceCharacterFromString(inDesignText, ']');
                            inDesignText = ReplaceCharacterFromString(inDesignText, '$');
                            ////alert('prices2 inDesignText-'+inDesignText);
                            break;
                        }
                    }
                }
            }
        }


    }
    catch (er) {
        ////	alert('Errro from GetProductNameFromIndesignText-' + er);
    }
    return inDesignText;
}
/////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// 30 April 2021 End
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



var url = 'D:\\RCG\TestFile.txt';
var fileLocation = 'D:\\RCG\\';
var destinationUrl = 'http://test.ccpeople.com.au/Uploads/UserProfile/';
function DownloadFile(e) {

    var http = require('http'),
        fs = require('fs');

    var request = http.get("http://www.gstatic.com/webp/gallery3/1.png", function (response) {

        if (response.statusCode === 200) {
            /// swal('get'+response.statusCode);   
            var file = fs.createWriteStream(destinationUrl, "ancopy.png");
            response.pipe(file);
            swal(file);
        }
        // Add timeout.
        request.setTimeout(12000, function () {
            request.abort();
        });

    });
}
function GotoHomePage() {


    var fnAndArgs = 'ResetAllValues()';
    ///swal(fnAndArgs);
    CSLibrary.evalScript(fnAndArgs, function (result) {

    });

    $('#divPageContentDiv').html('');
    LoadIndexSubPage();
    wholeProductFromInDesign = [];
    errorValues = '';
    warningValues = '';
    successValues = '';
    resultForIndex = '';
    indexFilePath = '';
    indexFileName = '';
    successReturnValue = '';
    errorReturnValue = '';
    warningReturnValue = '';
    isItaNewPageForError = false;
    isItaNewPageForWarning = false;
    isItaNewPageForSucess = false;
}

function Test() {
    var dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    var dirDesktop = require("path").join(dirHome, "Desktop");
    swal(dir_desktop);
}

function JsonConvert() {
    try {
        ///  swal('JsonConvert');
        var fs = require('fs');

        var productDetails = fs.readFileSync(process.env.APPDATA + '/RCG/Indesign/ProductDetails.txt', { encoding: 'utf8' });

        ///swal(productDetails);
        if (productDetails != null && productDetails != '' && productDetails != undefined) {
            ///swal(productDetails);        
            var indexFiles = productDetails.split(',');
            var index = jQuery.parseJSON(indexFiles[0] + '}');
            ////swal(index.IndexFilePath);
            var matches = productDetails.match(/\[(.*?)\]/);
            var json = jQuery.parseJSON(matches[0]);;
            for (var t = 0; t < json.length; t++) {
                swal(json[t].Product);

            }

            if (matches) {
                var submatch = matches[0];
            }

        }
    }
    catch (er) {
        /////swal(er);
        $('#spanEror').text('Error JsonConvert from -' + er);
    }
}

function TestNewPdtName() {
    var test = 'AUF1022[AUF1022-18|ln]  $[AUF1022-18|pr][AUF1022-18|wt]g';

    var fnAndArgs = "GetProductBNameFromIndesignText('" + test + "')";
    ///swal(fnAndArgs);
    CSLibrary.evalScript(fnAndArgs, function (result) {
        swal('result from jsx-' + test + ' ->' + result);

    });

}

function SwalFn() {
    try {
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
    catch (er) {
        //// swal(er);
        $('#spanEror').text('Error swal from -' + er);
    }
}

function StringFound() {
    var strng;
    strng = "RC11866[RC11866-07|ln [RC11866-07|wtg $[RC11866-07|pr";
    var searchWord = 'C11866-074';
    var position = strng.search(searchWord);


    alert(strng + " | Desired String is present at position : " + position);


}

function GetValueBetweenSqureBrackets() {
    try {
        ///alert('GetValueBetweenSqureBrackets');
        var text = "WBOX024  0.4mm [WBOX024-18|ln] [WBOX024-18|wt]g (0.03 gr/inch)";
        var regex = /\[([^\][]*)]/g;
        var results = [], m;
        while (m = regex.exec(text)) {
            results.push(m[1]);
        }

        for (var inc = 0; inc < results.length; inc++) {
            if (results[inc].indexOf('|ln') > -1) {
                text = text.replace(results[inc], "New length");
            }
            else if (results[inc].indexOf('|wt') > -1) {
                text = text.replace(results[inc], "New weight");
            }
        }
        alert(text);
    }
    catch (er) {
        alert(er);
    }


    var str = "Visit Microsoft!";
    var res = str.replace("Microsoft", "W3Schools");
    alert(str + ' - ' + res);
}

function ArrayFilter() {
    //var arr = ["testnews", "foo", "bar", "news-[0-999999999999999]*","news","foonews"];

    var url = "foo";

    var matches = arr.filter(function (pattern) {
        return new RegExp(pattern).test(url);
    });

    for (var inc = 0; inc < matches.length; inc++) {
        alert('inc-' + inc + ' content- ' + matches[inc]);
    }


}


function jsonFilter() {

    var officers = [
        { id: 20, name: 'Captain Piett' },
        { id: 24, name: 'General Veers' },
        { id: 56, name: 'Admiral Ozzel' },
        { id: 88, name: 'Commander Jerjerrod' }
    ];

    var officersIds = officers.filter(function (officer) {
        return officer.id != 20;
    });
    for (var inc = 0; inc < officersIds.length; inc++) {
        alert('inc-' + inc + ' content- ' + officersIds[inc].name);
    }

}

function getPropFromJSON(prop, JSONString) {
    // Obviously this regex will only match Keys that have
    // String Values.
    var exp = new RegExp("\"" + prop + "\"\:[^\,\}]*");
    return JSONString.match(exp)[0].replace("\"" + prop + "\":", "");
}


function WriteLog(error) {
    var date = new Date();
    var fileName = 'ErrorLog_' + date.getDate() + '_' + (date.getMonth() + 1) + '_' + date.getFullYear() + '.txt';
    //// alert(fileName);
    var fs = require('fs');
    var filePath = process.env.APPDATA + '/RCG/' + fileName;
    ///swal(filePath);

    fs.appendFile(filePath, ('\n ' + date + ' ' + error), function (err) {
        if (err) throw err;
        ///console.log('Saved!');
    });


    if (!fs.existsSync(filePath)) {
        // alert('not found');
    }
    else {
        // alert('Found');
    }
}