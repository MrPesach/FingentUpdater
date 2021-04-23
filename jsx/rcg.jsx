
var globalSuccessValues = '';
var successReturnValue = '';
var errorReturnValue = '';
var warningReturnValue = '';
var isItaNewPageForError = false;
var isItaNewPageForWarning = false;
var isItaNewPageForSucess = false;
var stringReturnValue = '';
var productErrorPortion = '';
var ErrorToolTip = '';
var WarningToolTip = '';
/// 101 -> Product In Success,
/// 102 -> Product In Warning,
/// 103 -> Product In Error,
/// 104 -> warning with skip,

function GetProductDetailsFromIndesignFile(productData) 
{
	try
	{
		if (productData == null || productData == '' || productData == undefined) {
			////alert('There is no product details!');
			return errorReturnValue;
		}

	var myDoc = '';
	try
	{
		myDoc = app.activeDocument;
	}
	catch(er)
	{
		return "Please open one document for scanning!";
	}	
	//probably the same thing....
	var curDoc = app.documents[0];
	//Get pages 
	var allPages = curDoc.pages;
	if( allPages.length == 0)
	{
		return "There is no pages in the document!";
	}
	
	var pageName = '';
		for (var p = 0; p < allPages.length; p++) 
		{
			var currentPage = allPages[p];
			pageName = currentPage.name;
////			alert(pageName);
				
			/* 
			if(allPages[p].name != 21)
			{
					continue;
			}			
				*/
			///alert(pageName);
			isItaNewPageForError = true;
			isItaNewPageForWarning = true;
			isItaNewPageForSucess = true;
			////alert('currentPage.groups.length-'+currentPage.groups.length);
			var allGroups = currentPage.groups;
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			GetContentFromIndesign(tfNormal, productData, pageName,"I");			
				var i = 0;				
				///alert('pageName-'+pageName+'Group length-' + allGroups.length);
				for (i=0;i < allGroups.length;i++)
				{						
					var eachGroupI = allGroups[i];			
					///GetContentFromPage(eachGroupI, productDatais, pageName);		
					//GetContentFromGroup(eachGroupI, productData, pageName);									
					GetContentFromIndesign(eachGroupI.textFrames,productData, pageName,"G");	
					var allGroupJ=	allGroups[i].groups;
					///alert('J Group length-' + allGroupJ.length);
						for (j=0;j < allGroupJ.length;j++)
						{														
							var eachGroupJ = allGroupJ[j];													
							//GetContentFromGroup(eachGroupJ, productData, pageName);																		
							GetContentFromIndesign(eachGroupJ.textFrames,productData, pageName,"G");
							var allGroupK=	allGroupJ[j].groups;
								for (k=0;k < allGroupK.length;k++)
								{									
										var eachGroupK = allGroupK[k];		
										///GetContentFromGroup(eachGroupK, productData. pageName);										
										GetContentFromIndesign(eachGroupK.textFrames,productData, pageName,"G");
										var allGroupL=	allGroupK[k].groups;
										for (l=0;l < allGroupL.length;l++)
										{											
											//GetContentFromGroup(allGroupL[l], productData, pageName);											
											GetContentFromIndesign(allGroupL[l].textFrames,productData, pageName,"G");
										}		
								}														
						}											
				}	
			
		}
		return (errorReturnValue + "T123T" + warningReturnValue + "T123T" + successReturnValue);
	}
	catch(er)
	{
		return "GetProductDetailsFromIndesignFile new!"+er;
	}
}

function GetContentFromIndesign(tfNormal, productData, pageName, mode)
{
	try
	{
//////////////////////////////////NORMAL START /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////
		/////var tf = app.documents[0].textFrames.everyItem().getElements();	
		var pdtFromInDesign = '';
		var productStatus = 101;
		////var tfNormal = currentPage.textFrames.everyItem().getElements();			
		///alert('Normal-'+ tfNormal.length);
		for (var i = 0; i < tfNormal.length; i++) {
			var fullPdtContentFromInDesign = tfNormal[i].contents;
		/*	if(fullPdtContentFromInDesign.indexOf('RC11866-07') > -1 )
		{
			///alert(fullPdtContentFromInDesign);
		}*/
			
			////alert('Normal-'+fullPdtContentFromInDesign+' | [-> '+fullPdtContentFromInDesign.indexOf('[')+' | ] -> ' + fullPdtContentFromInDesign.indexOf(']') );
			if(fullPdtContentFromInDesign == '' || fullPdtContentFromInDesign == null 
			|| fullPdtContentFromInDesign == undefined )
			{
				continue;
			}

			/* 
			if(fullPdtContentFromInDesign.indexOf('ER11379') == -1 )
			{
				continue;
			}
			*/

			var leftIndex = fullPdtContentFromInDesign.indexOf('[');
			var rightIndex = fullPdtContentFromInDesign.indexOf(']');
			var lengthIndex = fullPdtContentFromInDesign.indexOf('|ln');
			var weightIndex = fullPdtContentFromInDesign.indexOf('|wt');
			var priceIndex = fullPdtContentFromInDesign.indexOf('|pr');

			if(leftIndex == rightIndex && leftIndex == -1 && lengthIndex == -1 && weightIndex == -1 && priceIndex == -1)
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
			if(dollarIndex == 0 && squareIndex == 1)
			{	
				var matches = fullPdtContentFromInDesign.match(/\[(.*?)\]/);
				///alert('matches.length-'+matches.length);
				if(matches != null && matches.length > 0)
				{
					for (var inc = 0; inc < matches.length; inc++) 
					{
						///alert(sku + ' | ' + inc + ' -> ' + matches[inc] );
						if(inc == 1)
						{
							var skuSplits = matches[inc].split('|');
							if(skuSplits.length > 1)
							{
								///pdtFromInDesign = '[' + skuSplits[0] + ']';
								pdtFromInDesign =  skuSplits[0] ;
							}					
						}
					}
				}
				else
				{					
					if(fullPdtContentFromInDesign.indexOf('[') > -1 && fullPdtContentFromInDesign.indexOf(']') == -1)
					{
							/// $[PKBX053-16|pr
							if(fullPdtContentFromInDesign.indexOf('|') > -1)
							{
								var matches = fullPdtContentFromInDesign.match(/\[(.*?)\|/);
								var subMatch = '';
								if (matches) {
									subMatch =  matches[1];
									///alert('subMatch in error-' + subMatch);
									//pdtFromInDesign = '[' + subMatch + ']';
									pdtFromInDesign =  subMatch ;
								}
								else
								{
									pdtFromInDesign = fullPdtContentFromInDesign;
								}
							}
					}
					else  if(fullPdtContentFromInDesign.indexOf('[') == -1 && fullPdtContentFromInDesign.indexOf(']') > -1)
					{
						/// $PKBX053-16|pr]
						if(fullPdtContentFromInDesign.indexOf('|') > -1)
						{
								var matches = fullPdtContentFromInDesign.split('|');
								if(matches.length > 1)
								{
									///pdtFromInDesign = '[' + matches[0].replace('$','')+ ']';
									pdtFromInDesign =  matches[0].replace('$','');
								}
						}
					}
					else
					{
						pdtFromInDesign = fullPdtContentFromInDesign;
					}
											
				}
				//alert('GetProductNameFromIndesignTextForTableFormat normal called');
				////pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
			}
			else
			{
				///alert('Normal format called');				
				pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
				///alert('pdtFromInDesign-'+pdtFromInDesign);
			}

			////alert('Before format - '+fullPdtContentFromInDesign+' | pdtFromInDesign-'+pdtFromInDesign);				
			if(pdtFromInDesign == '')
			{
				///alert(fullPdtContentFromInDesign+' is Empty')
				continue;
			}
			///alert('fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'NORMAL'+'pdtFromInDesign-'+pdtFromInDesign);
			/*	*/
			////alert('Normal fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'pageName-'+pageName);
				anyDataExists = true;
				productStatus = 101;
				/// 101 -> Product In Success,
				/// 102 -> Product In Warning,
				/// 103 -> Product In Error,
				/// 104 -> warning with skip,
				///alert('productData.length'+productData.length);
				for (var g = 0; g < productData.length; g++) {
					try 
					{
						newTextForIndesign = '';
						var pdtFromAppData = productData[g].Product;
						var lengthFromAppData = productData[g].Length;
					///alert('pdtFromAppData->'+pdtFromAppData+' |pdtFromInDesign- '+pdtFromInDesign);
						var weightFromAppData = productData[g].Weight;
						var rateFromAppData = productData[g].Price;						
					////	alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData ->'+pdtFromAppData);
					if (pdtFromInDesign == pdtFromAppData) 
						{
							///alert('Product found '+pdtFromInDesign);
							/// Product found in indesign								
							if(CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData,  rateFromAppData ))
							{
								productStatus = 103;									
								/// 103 -> Product In Error,									
								///alert('continue ');
								break;
							}
							
							/////GetAllWarningsFromTheIndesignProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
							if(CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData ))
							{
								///alert('CheckAnyWarningInProduct calling frm page normal');
								productStatus = 102;///Warning with skip
								///alert('fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus);					
								////alert(fullPdtContentFromInDesign + ' Product In Warning');									
								break;
							}

								productStatus = 101;	
							break;
						} // found if close
						else {
							productStatus = 102;	/// 102 -> Product In Warning,
							productErrorPortion = pdtFromInDesign+' - Product missing from product manager';
							///alert('in warning');
						}
						///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
					}
					catch (er) {
						alert('Normal section-' + er);							
					}

				}///productData loop

				////alert('from normal fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)
				
				if(productStatus == 101) /// 101 -> Product In Success,
				{
					////alert(pdtFromInDesign + 'Product In Success');					
					if (successReturnValue.length == 0) {
						successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
					}
					else {
						successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
					}
					isItaNewPageForSucess = false;
					////alert('successReturnValue-'+successReturnValue);
				} 
				else if(productStatus == 102) //// Product missing from group 	/// 102 -> Product In Warning
				{
					////alert(fullPdtContentFromInDesign + ' Product In Warning');						
					///var pdt = GetProductFromWarning(fullPdtContentFromInDesign);
					if (warningReturnValue.length == 0) {
						warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
					}
					else 
					{
						warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
					}
					isItaNewPageForWarning = false;
				}					 
				else if (productStatus == 103) /// 101 -> Product In Error,
				{
						//var pdt =	GetProductFromError(fullPdtContentFromInDesign);
						pdt = fullPdtContentFromInDesign;
						if (errorReturnValue.length == 0) {
							errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L1C12L0C12L"+ErrorToolTip
						}
						else {
							errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L1C12L0C12L"+ErrorToolTip
						}
						isItaNewPageForError = false;
				}
			
		} //text frame close
		//////////////////////////////////NORMAL END /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////			
	}
	catch(er)
	{
		alert('GetContentFromPage'+er);
	}
}


function GetProductNameFromInvalidSKU(fullPdtContentFromInDesign)
{
	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	for (var inc = 0; inc < spaceSplits.length; inc++) 
	{
		/*
		if(fullPdtContentFromInDesign.indexOf('RC6980') > -1)
		{
			alert('inc-'+inc + 'conten->'+spaceSplits[inc]+' fullPdtContentFromInDesign->'+fullPdtContentFromInDesign);
		}
	   */
		if(inc == 0)/// SKU Parent name
		{
			var removedPortion = spaceSplits[inc];			
			return fullPdtContentFromInDesign.replace(removedPortion,'');
		}
	}

	return fullPdtContentFromInDesign;
}

function CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
{
	/*
	alert('CheckAnyErrorInProduct');

	if(fullPdtContentFromInDesign.indexOf('RW020-18') == -1 )
	{
		return;
	}
	*/
	productErrorPortion = fullPdtContentFromInDesign;
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
		return true;								
	}


	var countOfLeftSqure =0;
	var countOfRightSqure =0;
	for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) 
	{
		if(fullPdtContentFromInDesign[inc] == '[')
		{
			countOfLeftSqure ++;
		}
		else if(fullPdtContentFromInDesign[inc] == ']')
		{
			countOfRightSqure ++;
		}
	}

	///alert('countOfLeftSqure-'+countOfLeftSqure+' | countOfRightSqure-'+countOfRightSqure)
		if(countOfLeftSqure != countOfRightSqure)
		{			
				return true;			
		}	
		

	var lengthPortion = '';
	var weightPortion = '';
	var pricePortion = '';
	var content ='';
	var hasLeftFound = false;
	var hasRightFound = false;
	///alert('start scanning '+fullPdtContentFromInDesign);
	for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) 
	{		
		///alert(fullPdtContentFromInDesign[inc]);

		if(fullPdtContentFromInDesign[inc] == '[')
		{
			///alert('[ found content-'+ content);
			hasLeftFound = true;
			content='';
			continue;
		}
		
		if(fullPdtContentFromInDesign[inc] == ']')
		{
			///alert('] found content-'+ content);
			hasRightFound = true;
			hasLeftFound = false; 
		}

		if(hasRightFound)
		{
			if(content.indexOf('ln') > -1){
				lengthPortion = content;
			}
			else if(content.indexOf('wt') > -1){
				weightPortion = content;				
			}
			else if(content.indexOf('pr') > -1){
				pricePortion = content;
			}

			hasLeftFound = false;
			hasRightFound = false; 
			content='';
		}

		if(hasLeftFound)
		{
			content += fullPdtContentFromInDesign[inc];
		}
	}

	///alert('lengthPortion-'+lengthPortion+' |weightPortion- '+weightPortion+' |pricePortion- '+pricePortion+'lengthFromAppData-'+lengthFromAppData+' |weightFromAppData-'+weightFromAppData+' | rateFromAppData-'+rateFromAppData);
	if(lengthPortion.length > 0 && lengthPortion.indexOf('|') == -1)
	{	
		return true;
	}
	if(weightPortion.length > 0 && weightPortion.indexOf('|') == -1)
	{
		///alert('weightPortion-'+weightPortion+' | weightFromAppData-'+weightFromAppData);
		///alert('ln missing'+subMatch);		
		return true;
	}
	if(pricePortion.length > 0 && pricePortion.indexOf('|') == -1)
	{
		///alert('pricePortion-'+pricePortion+' | rateFromAppData-'+rateFromAppData);
		///alert('wt missing-'+subMatch);		
		return true;
	}
	var totalSectionsInPdt = 0;
	if(lengthPortion.length > 0)
	{
		totalSectionsInPdt++;
	}
	if(weightPortion.length > 0)
	{
		totalSectionsInPdt++;
	}
	if(pricePortion.length > 0)
	{
		totalSectionsInPdt++;
	}
///alert('totalSectionsInPdt-'+totalSectionsInPdt+' | (countOfLeftSqure + countOfRightSqure)'+(countOfLeftSqure + countOfRightSqure))
	if((totalSectionsInPdt * 2) != (countOfLeftSqure + countOfRightSqure))
	{
		return true;
	}

	/////////////////////////////////////////////////////////////////////////	
	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	////alert( spaceSplits.length);
	var identifierCount = 0;
	var leftRightSqureBracketCnt = 0;
	for (var inc = 0; inc < spaceSplits.length; inc++) 
	{
		var item = spaceSplits[inc];
		////alert(item);
		if(item == '' || item == null || item == undefined)
		{
			continue;
		}
	
		if(item.indexOf('|ln') > -1)
		{
			identifierCount++;	
		}
		else if(item.indexOf('|wt') > -1)
		{
			identifierCount++;
		}
		else if(item.indexOf('|pr') > -1)
		{
			identifierCount++;
		}

		if(item.indexOf('[') > -1)
		{
			leftRightSqureBracketCnt++;
		}
		
		if(item.indexOf(']') > -1)
		{
			leftRightSqureBracketCnt++;
		}
	}

	//// Error
	if((identifierCount * 2) !=  leftRightSqureBracketCnt)
	{
		return true;
	}
}

//////////////////////////////////////
function CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
{
 /* 
 ///alert('CheckAnyWarningInProduct');
	if(fullPdtContentFromInDesign.indexOf('RC6979-07') == -1 )
	{
		///return;
	}	
	*/	
	productErrorPortion = fullPdtContentFromInDesign;
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
		return true;								
	}

	var lengthPortion = '';
	var weightPortion = '';
	var pricePortion = '';
	var content ='';
	var hasLeftFound = false;
	var hasRightFound = false;
	///alert('start scanning '+fullPdtContentFromInDesign);
	for (var inc = 0; inc < fullPdtContentFromInDesign.length; inc++) 
	{		
		///alert(fullPdtContentFromInDesign[inc]);

		if(fullPdtContentFromInDesign[inc] == '[')
		{
			///alert('[ found content-'+ content);
			hasLeftFound = true;
			content='';
			continue;
		}
		
		if(fullPdtContentFromInDesign[inc] == ']')
		{
			///alert('] found content-'+ content);
			hasRightFound = true;
			hasLeftFound = false; 
		}

		if(hasRightFound)
		{
			if(content.indexOf('ln') > -1){
				lengthPortion = content;
			}
			else if(content.indexOf('wt') > -1){
				weightPortion = content;				
			}
			else if(content.indexOf('pr') > -1){
				pricePortion = content;
			}

			hasLeftFound = false;
			hasRightFound = false; 
			content='';
		}

		if(hasLeftFound)
		{
			content += fullPdtContentFromInDesign[inc];
		}
	}

///alert('lengthPortion-'+lengthPortion+' |weightPortion- '+weightPortion+' |pricePortion- '+pricePortion+'lengthFromAppData-'+lengthFromAppData+' |weightFromAppData-'+weightFromAppData+' | rateFromAppData-'+rateFromAppData);
	if(lengthPortion.length > 0 &&  (lengthFromAppData == '' || lengthFromAppData == null || lengthFromAppData == undefined ))
	{		
		///alert('lengthPortion-'+lengthPortion+' | lengthFromAppData-'+lengthFromAppData);
		productErrorPortion = '[' +  lengthPortion + '] - Length missing';
		return true;
	}
	else if(weightPortion.length > 0 && (weightFromAppData == '' || weightFromAppData == null || weightFromAppData == undefined ))
		{
			///alert('weightPortion-'+weightPortion+' | weightFromAppData-'+weightFromAppData);
			///alert('ln missing'+subMatch);
			productErrorPortion = '[' + weightPortion + '] - Weight missing';
			return true;
		}
		else if(pricePortion.length > 0 && (rateFromAppData == '' || rateFromAppData == null || rateFromAppData == undefined ))
		{
			///alert('pricePortion-'+pricePortion+' | rateFromAppData-'+rateFromAppData);
			///alert('wt missing-'+subMatch);
			productErrorPortion = '[' + pricePortion + '] - Price Missing';
			return true;
		}

	return false;
}

function GetAllWarningsFromTheIndesignProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
{

var status = false;
 
	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	////alert( spaceSplits.length);
	var sku = '';
	for (var inc = 0; inc < spaceSplits.length; inc++) {
		var item = spaceSplits[inc];
		///alert(item);
		if(item == '' || item == null || item == undefined)
		{
			continue;
		}

		if(item.indexOf('ln') > -1 || item.indexOf('wt') > -1 || item.indexOf('pr') > -1)
		{
		sku = '';
		var matches = item.match(/\[(.*?)\]/);
		var subMatch = '';
		if (matches) {
			subMatch = '[' + matches[1] + ']';
			///alert('subMatch in warning-' + subMatch);
		}
		else
		{
			///alert('No match in warning -' + item);
			sku = item.split('[');
			if(sku.length > 1)
			{
				productErrorPortion = '[' + sku[1];
			}
			else
			{
				productErrorPortion = item;
			}			
			//alert(productErrorPortion);
			if (warningReturnValue.length == 0) {
				warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
			else 
			{
				warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
		}		
			
		if(subMatch == '' || subMatch == null || subMatch == undefined)
		{
			continue;
		}		

		if(subMatch.indexOf('ln') > -1 && (lengthFromAppData == '' || lengthFromAppData == null || lengthFromAppData == undefined ))
		{
			///alert('ln missing'+subMatch);
			productErrorPortion = subMatch;
			if (warningReturnValue.length == 0) {
				warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
			else 
			{
				warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
		}
		else if(subMatch.indexOf('wt') > -1 && (weightFromAppData == '' || weightFromAppData == null || weightFromAppData == undefined ))
		{
			///alert('wt missing-'+subMatch);
			productErrorPortion = subMatch;
			if (warningReturnValue.length == 0) {
				warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
			else 
			{
				warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + productErrorPortion + "C12L0C12L1C12LI";
			}
		}
	}
		/*else if(subMatch.indexOf('pr') > -1 && (rateFromAppData == '' || rateFromAppData == null || rateFromAppData == undefined ))
		{
			///alert('pr missing in warning');
			productErrorPortion = subMatch;
			return true;
		}
		*/
	
	}

	
}

function GetProductFromError(fullPdtContentFromInDesign)
{
/* 	*/
	if(fullPdtContentFromInDesign.indexOf('FOX080  0.8mm [FOX080-18|ln] [FOX080-18|wt]g (0.09 gr/inch)') == -1 )
	{
		////return;
	}
	
var	productErrorPortion = fullPdtContentFromInDesign;
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
									
	}

	/*if(fullPdtContentFromInDesign.indexOf(']g') == -1
	  || fullPdtContentFromInDesign.indexOf('$[') == -1) 
	{
		return true;								
	}
*/
	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	///alert( spaceSplits.length);
	for (var inc = 0; inc < spaceSplits.length; inc++) {
		var item = spaceSplits[inc];
		////alert(item);
		if(item == '' || item == null || item == undefined)
		{
			continue;
		}
	
		if(item.indexOf('ln') > -1 ||  item.indexOf('wt') > -1 )
		{			
		}
		else{
			continue;
		}

		var matches = item.match(/\[(.*?)\]/);
		var sku = '';
		var subMatch = '';
		if (matches) {
			subMatch = '[' + matches[1] + ']';
			///alert('subMatch in error-' + subMatch);
		}
		else
		{
			///ErrorToolTip = 'Squre bracket missing';
			////alert('No match in error-' + item);
			sku = item.split('[');
			if(sku.length > 1)
			{
				productErrorPortion = '[' + sku[1];
			}
			else
			{
				productErrorPortion = item;
			}
			
			
		}		
			
		if(subMatch == '' || subMatch == null || subMatch == undefined)
		{
			continue;
		}		

		if(subMatch.indexOf('[') == -1 || subMatch.indexOf(']') == -1)
		{	
			///ErrorToolTip = 'Squre bracket missing';		
			///alert(subMatch + '[] missing in error' );
			productErrorPortion = subMatch;
			
		}

		if(subMatch.indexOf('|') == -1)
		{			
			///ErrorToolTip = '| symbol missing';
			///alert(subMatch + '| missing in error' );
			productErrorPortion = subMatch;
			
		}
	}

	return productErrorPortion;
}

function GetProductFromWarning(fullPdtContentFromInDesign)
{

	if(fullPdtContentFromInDesign.indexOf('RC6980-07') == -1 )
	{
		////return;
	}	
	///alert('GetProductFromWarning');
var	productErrorPortion = fullPdtContentFromInDesign;
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
									
	}

	/*if(fullPdtContentFromInDesign.indexOf(']g') == -1
	  || fullPdtContentFromInDesign.indexOf('$[') == -1) 
	{
		return true;								
	}
*/
var inDesignText='';
var spaceSplits = fullPdtContentFromInDesign.split(' ');
////alert( spaceSplits.length);
for (var inc = 0; inc < spaceSplits.length; inc++) {
	var item = spaceSplits[inc];
	////alert(item);
	if(item == '' || item == null || item == undefined)
	{
		continue;
	}

	var matches = item.match(/\[(.*?)\]/);
	var sku = '';
	var subMatch = '';
	if (matches) {
		subMatch =  matches[1];
		////alert('subMatch in error-' + subMatch);
		if(subMatch.indexOf('ln') > -1 && subMatch.indexOf('|ln') > -1)
		{
			var splitItem = subMatch.split('|ln') ;
			if(splitItem.length > 1)
			{
				inDesignText = splitItem[0];
			}
		}
		else if(subMatch.indexOf('ln') > -1)
		{
			var splitItem = subMatch.split('ln') ;
			if(splitItem.length > 1)
			{
				if( splitItem[0].indexOf('|'))
				{
					var item = splitItem[0].split('|');
					if(item.length > 1)
					{
						inDesignText = item[0];
					}						
				}
			}
		}
		if(subMatch.indexOf('wt') > -1 && subMatch.indexOf('|wt') > -1)
		{
			var splitItem = subMatch.split('|wt') ;
			if(splitItem.length > 1)
			{
				inDesignText = splitItem[0];
			}
		}
		else if(subMatch.indexOf('wt') > -1)
		{
			var splitItem = subMatch.split('wt') ;
			if(splitItem.length > 1)
			{
				if( splitItem[0].indexOf('|'))
				{
					var item = splitItem[0].split('|');
					if(item.length > 1)
					{
						inDesignText = item[0];
					}						
				}
			}
		}
	}		
}
///alert(productErrorPortion);
	return inDesignText;
}



/////////////////////////////////////////////////////////////////////////////////////////

function GetProductNameFromIndesignText(fullPdtContentFromInDesign)
{
	var inDesignText = '';
	try
	{		
		9846
		/// FOX080  0.8mm [FOX080-18|ln] [FOX080-18|wt]g (0.09 gr/inch)
		/// RC6980[RC6980-07|ln] [RC6980-07|wt]g  $[RC6980-07|pr]
		var spaceSplits = fullPdtContentFromInDesign.split(' ');
	////alert( spaceSplits.length);
	for (var inc = 0; inc < spaceSplits.length; inc++) {
		var item = spaceSplits[inc];
		///alert('Each item-'+item);
		if(item == '' || item == null || item == undefined)
		{
			continue;
		}
	
		var matches = item.match(/\[(.*?)\]/);
		var sku = '';
		var subMatch = '';
		if (matches) {
			subMatch =  matches[1];
			///alert('matches fount in -' + subMatch);
			if(subMatch.indexOf('ln') > -1 && subMatch.indexOf('|ln') > -1)
			{
				var splitItem = subMatch.split('|ln') ;
				if(splitItem.length > 1)
				{
					
					inDesignText = splitItem[0];
				///	alert('LN1 inDesignText'+inDesignText);
				}
			}
			else if(subMatch.indexOf('ln') > -1)
			{
				var splitItem = subMatch.split('ln') ;
				if(splitItem.length > 1)
				{
					if( splitItem[0].indexOf('|'))
					{
						var item = splitItem[0].split('|');
						if(item.length > 1)
						{
							inDesignText = item[0];
							///alert('LN2 inDesignText'+inDesignText);
						}						
					}
				}
			}
			if(subMatch.indexOf('wt') > -1 && subMatch.indexOf('|wt') > -1)
			{
				var splitItem = subMatch.split('|wt') ;
				if(splitItem.length > 1)
				{
					inDesignText = splitItem[0];
					///alert('wt1 inDesignText'+inDesignText);
				}
			}
			else if(subMatch.indexOf('wt') > -1)
			{
				var splitItem = subMatch.split('wt') ;
				if(splitItem.length > 1)
				{
					if( splitItem[0].indexOf('|'))
					{
						var item = splitItem[0].split('|');
						if(item.length > 1)
						{
							inDesignText = item[0];
							///alert('wt2 inDesignText'+inDesignText);
						}						
					}
				}
			}
			else if(subMatch.indexOf('pr') > -1)
			{
				var splitItem = subMatch.split('pr') ;
				if(splitItem.length > 1)
				{
					if( splitItem[0].indexOf('|'))
					{
						var item = splitItem[0].split('|');
						if(item.length > 1)
						{
							inDesignText = item[0];
							///alert('pr inDesignText'+inDesignText);
						}						
					}
				}
			}
		}		
	}

	if(inDesignText == '')
	{
		////alert('In second part');
		///RC11866[RC11866-07|ln [RC11866-07|wtg $[RC11866-07|pr
		for (var inc = 0; inc < spaceSplits.length; inc++) {
			var item = spaceSplits[inc];
			///alert('Each item-'+item);
			if(item.indexOf('wt') > -1)
			{
				if(item.indexOf('|wt') > -1)
				{
					var weights =	item.split('|wt') ;
					if(weights.length > 0)
					{
						inDesignText = ReplaceCharacterFromString(weights[0], '[');
						////alert('weights1 inDesignText-'+inDesignText);
						break;
					}
				}
				else if(item.indexOf('wt') > -1)
				{
					var weights =	item.split('wt') ;
					if(weights.length > 0)
					{
						inDesignText = ReplaceCharacterFromString(weights[0], '[');
						////alert('weights2 inDesignText-'+inDesignText);
						break;
					}
				}
			}
			else if(item.indexOf('pr') > -1)
			{
				//$[RC11866-07|pr
				if(item.indexOf('|pr') > -1)
				{
					var prices = item.split('|pr') ;
					if(prices.length > 0)
					{
						inDesignText = ReplaceCharacterFromString(prices[0], '[');
						inDesignText = ReplaceCharacterFromString(inDesignText, ']');
						inDesignText = ReplaceCharacterFromString(inDesignText, '$');
						////alert('prices1 inDesignText-'+inDesignText);
						break;
					}
				}
				else if(item.indexOf('pr') > -1)
				{
					var prices =	item.split('pr') ;
					if(prices.length > 0)
					{
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
	catch(er)
	{
		alert('Errro from GetProductNameFromIndesignText-' + er);
	}
	return inDesignText;
}
/////////////////////////////////////////////////////////////////////////////////////////

function ReplaceCharacterFromString(strText, replaceChar)
{
	var newString ='';
	if(strText == '')
	{
		return newString;	
	}

	for (var inc = 0; inc < strText.length; inc++) 
	{		
		if(strText[inc] != replaceChar)
		{
			newString += strText[inc];
		}
	}

	return newString;
}

function GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign)
{
	try
	{
	///alert('from GetProductNameFromIndesignText jsx')
		if(fullPdtContentFromInDesign.indexOf('$') > -1 && fullPdtContentFromInDesign.indexOf('[') > -1 
		&& fullPdtContentFromInDesign.indexOf(']') > -1 && 
		(fullPdtContentFromInDesign.indexOf('pr') > -1 || fullPdtContentFromInDesign.indexOf('PR') > -1 ))
		{
			var indexOfDollar = fullPdtContentFromInDesign.indexOf('$');
			var indexOfPrice = fullPdtContentFromInDesign.indexOf('|pr');
			if(indexOfPrice == -1)
			{
				indexOfPrice = fullPdtContentFromInDesign.indexOf('|PR');
			}
			if(indexOfDollar > -1 && indexOfPrice > -1)
			{
				return fullPdtContentFromInDesign.substring((indexOfDollar+2),indexOfPrice);
			}
		}
	}
	catch(er)
	{
		alert('Errro from GetProductNameFromIndesignText-' + er);
	}
	return '';
}

/////////////////////////////////////////////////////////////////////////////////////////

function GetProductFirstPart(fullPdtContentFromInDesign)
{
	try
	{
		///alert('from GetProductNameFromIndesignText jsx')
		if( fullPdtContentFromInDesign.indexOf('[') > -1)
		{
			var splits = fullPdtContentFromInDesign.split('[');
			if(splits.length > 0)
			{
				return splits[0].replace(/^\s+|\s+$/g, '');
			}		
		}
	}
	catch(er)
	{
		alert('GetProductFirstPart-'+er);
	}

	return '';
}

/////---------------------------------------------------------------------------------------------------

function UpdateProductDetailsIntheIndesignFile(productData) 
{
	try
	{
		///alert('In UpdateProductDetailsIntheIndesignFile');
		stringReturnValue = '';		
		if (productData == null || productData == '' || productData == undefined) {
			////alert('There is no product details!');
			return errorReturnValue;
		}
		///alert('productData-'+productData.length);
		/*
		var result = GetProductDetailsFromIndesignFile(productData);
		if(result != null && result != '' && result != undefined )
		{ 
			alert('result'+result);
			var splitResults = result.split('T123T');
			////$('#spanEror').text('splitResults.length-'+splitResults.length);
			if(splitResults.length == 3)
			{     
				globalSuccessValues = splitResults[2];
				////alert('globalSuccessValues-'+globalSuccessValues);
			}
		}
		*/

	var myDoc = '';
	try
	{
		myDoc = app.activeDocument;
	}
	catch(er)
	{
		return "Please open one document for scanning!";
	}	
	//probably the same thing....
	var curDoc = app.documents[0];
	//Get pages 
	var allPages = curDoc.pages;
	if( allPages.length == 0)
	{
		return "There is no pages in the document!";
	}

	indexFileName = 'Index ';
	var pageName = '';
		for (var p = 0; p < allPages.length; p++) 
		{
			var currentPage = allPages[p];
			pageName = currentPage.name;
			//alert('pageName-'+pageName)		;
			if(p == 0)
			{
				indexFileName += pageName;
			}
			else if(p == allPages.length-1)
			{
				indexFileName +='-'+ pageName;
			}

////			alert(pageName);			
		/*	if(allPages[p].name != 21)
			{
				continue;
			}
			*/

			///alert(pageName);		
			////alert('currentPage.groups.length-'+currentPage.groups.length);
			var allGroups = currentPage.groups;
			var newTextForIndesign = '';
			var productFirstPart= '';
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			///UpdateContentToPage(currentPage, productData, pageName);			
			UpdateSKUDetailsToIndesign(tfNormal, productData, pageName);
				var i = 0;				
				///alert('pageName-'+pageName+'Group length-' + allGroups.length);
				for (i=0;i < allGroups.length;i++)
				{	
					///try{
					var eachGroupI = allGroups[i];								
					//UpdateContentToGroup(eachGroupI, productData, pageName);
					UpdateSKUDetailsToIndesign(eachGroupI.textFrames, productData, pageName);	
					var allGroupJ=	allGroups[i].groups;
					///alert('J Group length-' + allGroupJ.length);
						for (j=0;j < allGroupJ.length;j++)
						{							
							var eachGroupJ = allGroupJ[j];													
							//UpdateContentToGroup(eachGroupJ, productData, pageName);																		
							UpdateSKUDetailsToIndesign(eachGroupJ.textFrames, productData, pageName);
							var allGroupK=	allGroupJ[j].groups;
							for (k=0;k < allGroupK.length;k++)
							{								
								var eachGroupK = allGroupK[k];		
								//UpdateContentToGroup(eachGroupK, productData. pageName);										
								UpdateSKUDetailsToIndesign(eachGroupK.textFrames, productData, pageName);
								var allGroupL=	allGroupK[k].groups;
								for (l=0;l < allGroupL.length;l++)
								{											
									//UpdateContentToGroup(allGroupL[l], productData, pageName);
									UpdateSKUDetailsToIndesign(allGroupL[l].textFrames, productData, pageName);
								}									
							}					
						}				
				}	
		}

		indexFileName += '.csv';
		return stringReturnValue + "R34W"  +indexFileName;
		
	}
	catch(er)
	{
		return "UpdateProductDetailsIntheIndesignFile new!"+er;
	}
}


function UpdateSKUDetailsToIndesign(tfNormal, productData, pageName)
	{
		try
		{
		//	alert('UpdateSKUDetailsToIndesign');
	//////////////////////////////////NORMAL START /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////
	///var tfNormal = currentPage.textFrames.everyItem().getElements();
	var productFirstPart ='';
	var newTextForIndesign ='';
	for (var i = 0; i < tfNormal.length; i++) {
		///alert('Text frame normal-'+i);
		var fullPdtContentFromInDesign = tfNormal[i].contents;
		if(fullPdtContentFromInDesign == '' || fullPdtContentFromInDesign == null || fullPdtContentFromInDesign == undefined)
		{
			continue;
		}		

		if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1 )
		{
			continue;
		}
		/*
		if(fullPdtContentFromInDesign.indexOf('RC11866-07') == -1 )
		{
			continue;
		}
		*/

		///$[FOX080-18|pr]
		
		///$[FOX080-18|pr]
		var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
		var squareIndex = fullPdtContentFromInDesign.indexOf('[');
		///alert('dollarIndex-' + dollarIndex + 'squareIndex' + squareIndex);
		if(dollarIndex == 0 && squareIndex == 1)
		{			
			var matches = fullPdtContentFromInDesign.match(/\[(.*?)\]/);
			///alert('matches.length-'+matches.length);
			if(matches != null && matches.length > 0)
			{
				for (var inc = 0; inc < matches.length; inc++) 
				{
					///alert(sku + ' | ' + inc + ' -> ' + matches[inc] );
					if(inc == 1)
					{
						var skuSplits = matches[inc].split('|');
						if(skuSplits.length > 1)
						{
							///pdtFromInDesign = '[' + skuSplits[0] + ']';
							pdtFromInDesign =  skuSplits[0] ;
						}					
					}
				}
			}
			else
			{					
				if(fullPdtContentFromInDesign.indexOf('[') > -1 && fullPdtContentFromInDesign.indexOf(']') == -1)
				{
						/// $[PKBX053-16|pr
						if(fullPdtContentFromInDesign.indexOf('|') > -1)
						{
							var matches = fullPdtContentFromInDesign.match(/\[(.*?)\|/);
							var subMatch = '';
							if (matches) {
								subMatch =  matches[1];
								///alert('subMatch in error-' + subMatch);
								//pdtFromInDesign = '[' + subMatch + ']';
								pdtFromInDesign =  subMatch ;
							}
							else
							{
								pdtFromInDesign = fullPdtContentFromInDesign;
							}
						}
				}
				else  if(fullPdtContentFromInDesign.indexOf('[') == -1 && fullPdtContentFromInDesign.indexOf(']') > -1)
				{
					/// $PKBX053-16|pr]
					if(fullPdtContentFromInDesign.indexOf('|') > -1)
					{
							var matches = fullPdtContentFromInDesign.split('|');
							if(matches.length > 1)
							{
								///pdtFromInDesign = '[' + matches[0].replace('$','')+ ']';
								pdtFromInDesign =  matches[0].replace('$','');
							}
					}
				}
				else
				{
					pdtFromInDesign = fullPdtContentFromInDesign;
				}
										
			}
			//alert('GetProductNameFromIndesignTextForTableFormat normal called');
			////pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
		}
		else
		{
			////lert('GetProductNameFromIndesignText normal called');				
			pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
			///alert('pdtFromInDesign-'+pdtFromInDesign);
		}

		///alert('Before format - '+fullPdtContentFromInDesign+' | pdtFromInDesign-'+pdtFromInDesign);				
		if(pdtFromInDesign == '')
		{
			///alert(fullPdtContentFromInDesign+' is Empty')
			continue;
		}			
			///alert('pdtFromInDesign-'+pdtFromInDesign);
		if(dollarIndex == 0 && squareIndex == 1 && fullPdtContentFromInDesign.indexOf('pr'))
		{
			productFirstPart = pdtFromInDesign;			
			///$[OCB063-18|pr]
		}
		else
		{
			productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
		}
	
		///alert('productFirstPart-'+productFirstPart);
		/*
		if(fullPdtContentFromInDesign.indexOf('RC6979') == -1)
		{
		continue;
		}
		*/

		////alert('Normal fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'pageName-'+pageName);
		anyDataExists = true;
		productStatus = 101;
		/// 101 -> Product In Success,
		/// 102 -> Product In Warning,
		/// 103 -> Product In Error,
		/// 104 -> warning with skip,
		///alert('productData.length'+productData.length);
		for (var g = 0; g < productData.length; g++) {
			try 
			{
				newTextForIndesign = '';
				var pdtFromAppData = productData[g].Product;
				var lengthFromAppData = productData[g].Length;
			///alert('pdtFromAppData->'+pdtFromAppData+' |pdtFromInDesign- '+pdtFromInDesign);
				var weightFromAppData = productData[g].Weight;
				var rateFromAppData = productData[g].Price;
				
			////	alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData ->'+pdtFromAppData);
			if (pdtFromInDesign == pdtFromAppData) 
				{
					///alert('Product found '+pdtFromInDesign);
					/// Product found in indesign								
					if(CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData,  rateFromAppData ))
					{
						productStatus = 103;									
						/// 103 -> Product In Error,									
					///	alert('Error');
						break;
					}
					
					/////GetAllWarningsFromTheIndesignProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData )
					if(CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, rateFromAppData ))
					{
						///alert('Warning');
						productStatus = 102;///Warning with skip														
						break;
					}
					newTextForIndesign = GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"I")
						///alert('Success newTextForIndesign'+newTextForIndesign);					
					
						if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
							tfNormal[i].contents = newTextForIndesign;
							if(stringReturnValue.indexOf(productFirstPart) == -1)
							{
								stringReturnValue += "R12W" + productFirstPart + 'C12L' + pageName;
								////alert('I-> '+stringReturnValue);
							}
							break;
							// found if close
						}
						
						productStatus = 101;	
					break;
				} // found if close
				else {
					productStatus = 102;	/// 102 -> Product In Warning,
					productErrorPortion = pdtFromInDesign;
					///alert('in warning');
				}

				///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
			}
			catch (er) {
				alert('Normal section-' + er);							
			}

		}///productData loop

		////alert('from normal fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)		
		
	
} //text frame close
//////////////////////////////////NORMAL END /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////	
			//////////////////////////////////NORMAL END /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////			
		}
		catch(er)
		{
			alert('UpdateContentToPage'+er);
		}
}



function GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,from) {
	var newTextForIndesign = '';
	try
	{
 /*
if(fullPdtContentFromInDesign.indexOf('ER11384') == -1)
{
	return "";
}


		if(fullPdtContentFromInDesign.indexOf('RC10937') == -1 )
		{
			return "";
		}
*/
 		////alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | from-'+from);
 		var pdtFromInDesign = '';
	if (fullPdtContentFromInDesign != null && fullPdtContentFromInDesign != ''
		&& fullPdtContentFromInDesign != undefined
		&& fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1
		&& fullPdtContentFromInDesign.indexOf('[') > -1
		&& fullPdtContentFromInDesign.indexOf(']') > -1) 
		{
			////pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
			var indesignProducts = fullPdtContentFromInDesign.split('[');
			////alert(fullPdtContentFromInDesign + ' - ' + from + ' | indesignProducts.length- '+ indesignProducts.length);	
		//$[OCB063-18|pr]
		var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
		var squareIndex = fullPdtContentFromInDesign.indexOf('[');
		if(dollarIndex == 0 && squareIndex == 1 && (fullPdtContentFromInDesign.indexOf('pr') > -1 || fullPdtContentFromInDesign.indexOf('PR') > -1))
		{
			//$[OCB063-18|pr]
			if(fullPdtContentFromInDesign.indexOf('$') > -1)
			{
				newTextForIndesign = '$' + rateFromAppData;
			}
			else
			{
				newTextForIndesign = rateFromAppData;
			}
		}
		else if(fullPdtContentFromInDesign.indexOf('ln') > -1)			
			{
				////alert('Old code');
				for (var inc = 0; inc < indesignProducts.length; inc++) 
				{
					var item = '[' + indesignProducts[inc];								
					///alert(inc + 'fullPdtContentFromInDesign'+fullPdtContentFromInDesign + ' --> ' + item);
						if(inc ==0)
						{
							///newTextForIndesign += item;
							continue;
						}			

						if(item.indexOf('|') == -1)
						{			
							newTextForIndesign += item;
							///alert(subMatch + '| missing in error' );
							continue;
						}

						///alert(	item);
						//// First Item
						if (item.indexOf('[') == -1 && item.indexOf(']') == -1 && item.indexOf('$') == -1 && inc == 0) {
							newTextForIndesign += item;
						}
						else if (item.indexOf(']') > -1 && item.indexOf('ln') > -1) 
						{
							if(lengthFromAppData != '' && lengthFromAppData != null && lengthFromAppData != undefined)
							{
							
							var matches = item.match(/\[(.*?)\]/);
							var subMatch = '';
							if (matches) {
								subMatch =  matches[1];
								///alert('subMatch in error-' + subMatch);
							}
							var lengths = '';
							if(subMatch != '' && subMatch != null && subMatch != undefined)
							{
								lengths =	subMatch.split('|ln');					
							}

							if(lengthFromAppData != '' && lengthFromAppData != null && lengthFromAppData != undefined)
							{	
								if(lengths.length > 0)
								{
									/// newTextForIndesign += ' ' + lengths[0] + '\n';
									newTextForIndesign += ' ' + lengths[0] ;
								}
								newTextForIndesign +=  ' ' + lengthFromAppData;					
							}
							else
							{	if(lengths.length > 0)
								{
								///	newTextForIndesign += lengths[0] + '\n';
								newTextForIndesign += lengths[0];
								}
								newTextForIndesign += item;
							}
						}
						else
						{
							newTextForIndesign += item;
						}	
							///alert('After ln '+newTextForIndesign)			
						}			
						else if (item.indexOf(']g') > -1 && item.indexOf('wt') > -1)//Weight
						{
							if(weightFromAppData != '' && weightFromAppData != null && weightFromAppData != undefined)
							{
								newTextForIndesign +=  ' ' + weightFromAppData + 'g';
							}
							else
							{
								newTextForIndesign += item;
							}				
						}			
						else if (item.indexOf('pr]') > -1)////Price
						{
							
							var priceSplits = item.split(']');
							if(priceSplits.length > 1)
							{
								///alert('In old price item-'+item+' priceSplits[0]'+priceSplits[0]+' priceSplits[1]-'+priceSplits[1]+'rateFromAppData-'+rateFromAppData);

								if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
								{
									newTextForIndesign= newTextForIndesign.replace('$','');
									newTextForIndesign +=  ' $' + rateFromAppData + ' ' + priceSplits[1];
								}
								else
								{
									newTextForIndesign += item;
								}
							}
							else
							{
								if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
								{
									newTextForIndesign= newTextForIndesign.replace('$','');
									newTextForIndesign +=  ' $' + rateFromAppData;
								}
								else
								{
									newTextForIndesign +=  item;
								}								
							}
							
							///alert('After pr'+newTextForIndesign);
						}			
						else {
							///newTextForIndesign += item;
							///alert(' newTextForIndesign-'+newTextForIndesign);
						}
				

					///alert('item-'+item +' - newTextForIndesign-'+newTextForIndesign);
					//if else close
				}// for loop end
////alert('Ret newTextForIndesign- '+ newTextForIndesign);
				return newTextForIndesign;
			}
			/// Length mising and weight found
			else  if(fullPdtContentFromInDesign.indexOf('ln') == -1 && fullPdtContentFromInDesign.indexOf('wt') > -1) // length missing
			{
				///alert('New code');
				for (var inc = 0; inc < indesignProducts.length; inc++) 
				{
					var item = '[' + indesignProducts[inc];
					///alert(item);
						if(item.indexOf('|') == -1)
						{
							continue;
						}
						else if (item.indexOf('wt') > -1) 
						{
							////alert(item);
							var matches = item.match(/\[(.*?)\]/);
							var subMatch = '';
							if (matches) {
								subMatch =  matches[1];
								///alert('subMatch in error-' + subMatch);
							}
							var weights = '';
							var weightUnits =	item.split(']');
							if(subMatch != '' && subMatch != null && subMatch != undefined)
							{
								weights =	subMatch.split('|wt');	
							}
							///[ER11379|wt]g  
						////alert('weightFromAppData'+weightFromAppData);
							if(weightFromAppData != '' && weightFromAppData != null && weightFromAppData != undefined)
							{	
								///alert('weightUnits[0]- '+weightUnits[0]+' | weightUnits[1]- '+weightUnits[1]);
								if(weights.length > 0)
								{
								///	newTextForIndesign += ' ' + weights[0] + '\n';
								newTextForIndesign += ' ' + weights[0];
								///alert('weights[0]-'+weights[0]+' | newTextForIndesign-'+newTextForIndesign);
								}
								///alert('weightFromAppData-'+weightFromAppData);
								newTextForIndesign +=  ' ' + weightFromAppData;	
								if(weightUnits.length > 1)				
								{
								///	newTextForIndesign += weightUnits[1];
									///alert('weightUnits[0]-'+weightUnits[0]+' | newTextForIndesign-'+newTextForIndesign);	
								}
							}
							else
							{	
								newTextForIndesign = item.replace('$','');
							}	
							
							///alert('After wt -->'+newTextForIndesign);
						}
						else if (item.indexOf('pr]') > -1)////Price
						{
							var priceSplits = item.split(']');
							if(priceSplits.length > 1)
							{
								if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
								{
									newTextForIndesign = newTextForIndesign.replace('$','');
									newTextForIndesign +=  ' $' + rateFromAppData + ' ' + priceSplits[1];
								}
								else
								{
									newTextForIndesign += item;
								}
							}
							else
							{
								if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
								{
									newTextForIndesign = newTextForIndesign.replace('$','');
									newTextForIndesign +=  ' $' + rateFromAppData;
								}
								else
								{
									newTextForIndesign +=  item;
								}								
							}				
						}			
						else {
							////newTextForIndesign += item;
							///alert(' newTextForIndesign-'+newTextForIndesign);
						}		

					///alert('item-'+item +' - newTextForIndesign-'+newTextForIndesign);
					//if else close
				}// for loop end
			///alert('Old newTextForIndesign '+newTextForIndesign);
				return newTextForIndesign;
			}
		
		
		///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+'--->   newTextForIndesign-'+newTextForIndesign)
	}//if end
////alert(' '+newTextForIndesign);
	}
	catch(er)
	{
		alert('GenerateNewCaptionForProduct-' + er);
	}
	return newTextForIndesign;
}//function close