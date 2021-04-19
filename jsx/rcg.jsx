
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
				
			/*if(allPages[p].name != 213)//213 21
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
			GetContentFromPage(currentPage, productData, pageName);			
				var i = 0;				
				///alert('pageName-'+pageName+'Group length-' + allGroups.length);
				for (i=0;i < allGroups.length;i++)
				{						
					var eachGroupI = allGroups[i];			
					///GetContentFromPage(eachGroupI, productDatais, pageName);		
					GetContentFromGroup(eachGroupI, productData, pageName);				
					var allGroupJ=	allGroups[i].groups;
					///alert('J Group length-' + allGroupJ.length);
						for (j=0;j < allGroupJ.length;j++)
						{														
							var eachGroupJ = allGroupJ[j];													
							GetContentFromGroup(eachGroupJ, productData, pageName);																		
							var allGroupK=	allGroupJ[j].groups;
								for (k=0;k < allGroupK.length;k++)
								{									
										var eachGroupK = allGroupK[k];		
										GetContentFromGroup(eachGroupK, productData. pageName);										
										var allGroupL=	allGroupK[k].groups;
										for (l=0;l < allGroupL.length;l++)
										{											
												GetContentFromGroup(allGroupL[l], productData, pageName);											
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

	function GetContentFromPage(currentPage, productData, pageName)
	{
		try
		{
	//////////////////////////////////NORMAL START /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////
			/////var tf = app.documents[0].textFrames.everyItem().getElements();	
			var pdtFromInDesign = '';
			var productStatus = 101;
			var tfNormal = currentPage.textFrames.everyItem().getElements();			
			////alert('Normal-'+ tfNormal.length);
			for (var i = 0; i < tfNormal.length; i++) {
				
				var fullPdtContentFromInDesign = tfNormal[i].contents;
				if(fullPdtContentFromInDesign == '')
				{
					continue;
				}

				if(fullPdtContentFromInDesign != '' && fullPdtContentFromInDesign != null && fullPdtContentFromInDesign != undefined && fullPdtContentFromInDesign.indexOf('[') == -1)
				{
					continue;
				}
				if(fullPdtContentFromInDesign.indexOf('RC6979-07') == -1)
				{
					///continue;
				}
				/*9846	*/
				///alert('fullPdtContentFromInDesign page '+fullPdtContentFromInDesign);
				
				///$[FOX080-18|pr]
				var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
				var squareIndex = fullPdtContentFromInDesign.indexOf('[');
				///alert('dollarIndex-' + dollarIndex + 'squareIndex' + squareIndex);
				if(dollarIndex == 0 && squareIndex == 1)
				{
					///alert('GetProductNameFromIndesignTextForTableFormat normal called');
					pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
				}
				else
				{
					////alert('GetProductNameFromIndesignText normal called');				
					pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
				}

				////alert('Before format - '+fullPdtContentFromInDesign);
				
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
							///alert('pdtFromAppData->'+pdtFromAppData);
							var weightFromAppData = productData[g].Weight;
							var rateFromAppData = productData[g].Price;
							
						////	alert('pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData ->'+pdtFromAppData);
							if (pdtFromInDesign == pdtFromAppData) 
							{
								///alert('Product found '+pdtFromInDesign);
								/// Product found in indesign								
								if(CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData ))
								{
									productStatus = 103;
										/// 103 -> Product In Error,									
									///alert('continue ');
									break;
								}

								if(CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData ))
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
						var pdt = GetProductFromWarning(fullPdtContentFromInDesign);
						if (warningReturnValue.length == 0) {
							warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else 
						{
							warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForWarning = false;
					}					 
					else if (productStatus == 103) /// 101 -> Product In Error,
					{
					var pdt =	GetProductFromError(fullPdtContentFromInDesign);
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

function GetContentFromGroup(grp, productData, pageName)
{
	try
	{
/////////////////////////////////Groups ////////////GetProductDetailsFromIndesignFile//////////////////////////////////////
				////	alert(' textFrames.length from group '+ grp.textFrames.length);
				for (var t = 0; t < grp.textFrames.length; t++) 
				{					
					var tff = grp.textFrames[t];
					var fullPdtContentFromInDesign = tff.contents;
					if(fullPdtContentFromInDesign == '')
					{
						continue;
					}

					if(fullPdtContentFromInDesign != '' && fullPdtContentFromInDesign != null && fullPdtContentFromInDesign != undefined && fullPdtContentFromInDesign.indexOf('[') == -1)
					{
						continue;
					}
					///alert('fullPdtContentFromInDesign from group-'+fullPdtContentFromInDesign)					
					if(fullPdtContentFromInDesign.indexOf('RC6979-07') == -1)
					{
						///continue;
					}
			/*	*/
				///alert('fullPdtContentFromInDesign group '+fullPdtContentFromInDesign);
					/* 
					if(fullPdtContentFromInDesign.indexOf('RC6980-07') == -1)
					{
						continue;
					}
					*/
					///$[FOX080-18|pr]
					var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
					var squareIndex = fullPdtContentFromInDesign.indexOf('[');
					if(dollarIndex == 0 && squareIndex == 1)
					{
						///alert('GetProductNameFromIndesignTextForTableFormat in group');
						pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
					}
					else
					{
						///alert('GetProductNameFromIndesignText in group');
						pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
					}
					
					if(pdtFromInDesign == '')
					{
							continue;
					}
					///alert('fullPdtContentFromInDesign'+fullPdtContentFromInDesign+' pdtFromInDesign-'+pdtFromInDesign);
					///continue;
					anyDataExists = true;					
						productStatus = 101;//success					
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try 
							{
								newTextForIndesign = '';
								var pdtFromAppData = productData[pdt].Product;
								var weightFromAppData = productData[pdt].Weight;
								var rateFromAppData = productData[pdt].Price;
								var lengthFromAppData = productData[pdt].Length;
								////alert('gp pdtFromInDesign-'+pdtFromInDesign+' | pdtFromAppData ->'+pdtFromAppData);
								if (pdtFromInDesign == pdtFromAppData) 
								{	
									///alert('Product found in json group');
									if(CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData ))
									{
										productStatus = 103;	/// 103 -> Product In Error,
										break;
									}

									if(CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData ))
									{
										///alert('CheckAnyWarningInProduct calling from group');
										productStatus = 102;///Warning with warning
										///alert('fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)
										break;
									}

									productStatus = 101;									
									break;
								} // found if close
								else {
									///alert('product not found pdtFromInDesign-'+pdtFromInDesign);
									productStatus = 102;	/// 102 -> Product In Warning,
								}

								///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
							}
							catch (er) {
								alert('Group section-' + er);
							}

						} //productData loop closed
						///alert('from group fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | productStatus-'+productStatus);
						if (productStatus == 101) /// 101 -> Product In Success,
						{
							if (successReturnValue.length == 0) {
								successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForSucess = false;
						}
						else if (productStatus == 102) //// Product missing 102 -> Product In Warning
						{	
							var pdt = GetProductFromWarning( fullPdtContentFromInDesign);
							if (warningReturnValue.length == 0) {
								warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L0C12L1C12LG";
							}
							else {
								warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L0C12L1C12LG";
							}
							isItaNewPageForWarning = false;

						}						 
						else if (productStatus == 103) /// 101 -> Product In Error,
						{
							var pdt = GetProductFromError( fullPdtContentFromInDesign);
							if (errorReturnValue.length == 0) {
								errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L1C12L0C12L"+ErrorToolTip
							}
							else {
								errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdt + "C12L1C12L0C12L"+ErrorToolTip
							}
							isItaNewPageForError = false;
						}

					
				}//textFrames close		
			}
			catch(er)
			{
				alert('GetContentFromGroup ' + er);
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

function CheckAnyErrorInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData )
{
	///alert('CheckAnyErrorInProduct');
/* 	
	if(fullPdtContentFromInDesign.indexOf('RC6980-18') == -1 )
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

	/*if(fullPdtContentFromInDesign.indexOf(']g') == -1
	  || fullPdtContentFromInDesign.indexOf('$[') == -1) 
	{
		return true;								
	}
*/
	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	///alert('CheckAnyErrorInProduct spaceSplits.length-'+ spaceSplits.length);
	for (var inc = 0; inc < spaceSplits.length; inc++) {
		var item = spaceSplits[inc];
		///alert('CheckAnyErrorInProduct-'+item);
		if(item == '' || item == null || item == undefined)
		{
			continue;
		}

		if(item.indexOf('ln') > -1 || item.indexOf('wt') > -1 || item.indexOf('pr') > -1)
		{
			var matches = item.match(/\[(.*?)\]/);
			var sku = '';
			var subMatch = '';
			if (matches) {
				subMatch = '[' + matches[1] + ']';
				////alert('subMatch in error-' + subMatch);
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
				
				return true;
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
				return true;
			}

			if(subMatch.indexOf('|') == -1)
			{			
				///ErrorToolTip = '| symbol missing';
				///alert(subMatch + '| missing in error' );
				productErrorPortion = subMatch;
					return true;
			}
		}
	}

	return false;
}
//////////////////////////////////////


//////////////////////////////////////

function CheckAnyWarningInProduct(fullPdtContentFromInDesign, lengthFromAppData, weightFromAppData, pdtFromAppData, weightFromAppData, rateFromAppData )
{
 /* */
 ///alert('CheckAnyWarningInProduct');
	if(fullPdtContentFromInDesign.indexOf('RC6979-07') == -1 )
	{
		///return;
	}	
		
	productErrorPortion = fullPdtContentFromInDesign;
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
		return true;								
	}

	/*if(fullPdtContentFromInDesign.indexOf(']g') == -1
	  || fullPdtContentFromInDesign.indexOf('$[') == -1) 
	{
		return true;								
	}
*/
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
			return true;
		}		
			
		if(subMatch == '' || subMatch == null || subMatch == undefined)
		{
			continue;
		}		

		if(subMatch.indexOf('ln') > -1 && (lengthFromAppData == '' || lengthFromAppData == null || lengthFromAppData == undefined ))
		{
			///alert('ln missing'+subMatch);
			productErrorPortion = subMatch;
			return true;
		}
		else if(subMatch.indexOf('wt') > -1 && (weightFromAppData == '' || weightFromAppData == null || weightFromAppData == undefined ))
		{
			///alert('wt missing-'+subMatch);
			productErrorPortion = subMatch;
			return true;
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

	return false;
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


	///alert('from GetProductNameFromIndesignText jsx')
		/* if(fullPdtContentFromInDesign.indexOf('$') > -1 && fullPdtContentFromInDesign.indexOf('[') > -1 && fullPdtContentFromInDesign.indexOf(']') > -1)
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
		else{
			alert(fullPdtContentFromInDesign+ ' invalid ');
		}
		*/
	}
	catch(er)
	{
		alert('Errro from GetProductNameFromIndesignText-' + er);
	}
	return inDesignText;
}
/////////////////////////////////////////////////////////////////////////////////////////

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
		stringReturnValue = '';		
		if (productData == null || productData == '' || productData == undefined) {
			////alert('There is no product details!');
			return errorReturnValue;
		}
		///alert('productData-'+productData.length);
		var result = GetProductDetailsFromIndesignFile(productData);
		if(result != null && result != '' && result != undefined )
		{ 
			var splitResults = result.split('T123T');
			////$('#spanEror').text('splitResults.length-'+splitResults.length);
			if(splitResults.length == 3)
			{     
				globalSuccessValues = splitResults[2];
				////alert('globalSuccessValues-'+globalSuccessValues);
			}
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

	indexFileName = 'Index ';
	var pageName = '';
		for (var p = 0; p < allPages.length; p++) 
		{
			var currentPage = allPages[p];
			pageName = currentPage.name;		
			if(p == 0)
			{
				indexFileName += pageName;
			}
			else if(p == allPages.length-1)
			{
				indexFileName +='-'+ pageName;
			}

////			alert(pageName);			
		/*	if(allPages[p].name != 213)//213 21
			{
				continue;
			}
			*/
				
			///alert(pageName);		
			////alert('currentPage.groups.length-'+currentPage.groups.length);
			var allGroups = currentPage.groups;
			var newTextForIndesign = '';
			var productFirstPart= '';
			UpdateContentToPage(currentPage, productData, pageName);			
				var i = 0;				
				///alert('pageName-'+pageName+'Group length-' + allGroups.length);
				for (i=0;i < allGroups.length;i++)
				{	
					///try{
					var eachGroupI = allGroups[i];			
					///GetContentFromPage(eachGroupI, productDatais, pageName);		
					UpdateContentToGroup(eachGroupI, productData, pageName);				
					var allGroupJ=	allGroups[i].groups;
					///alert('J Group length-' + allGroupJ.length);
						for (j=0;j < allGroupJ.length;j++)
						{							
							var eachGroupJ = allGroupJ[j];													
							UpdateContentToGroup(eachGroupJ, productData, pageName);																		
							var allGroupK=	allGroupJ[j].groups;
							for (k=0;k < allGroupK.length;k++)
							{								
								var eachGroupK = allGroupK[k];		
								UpdateContentToGroup(eachGroupK, productData. pageName);										
								var allGroupL=	allGroupK[k].groups;
								for (l=0;l < allGroupL.length;l++)
								{											
									UpdateContentToGroup(allGroupL[l], productData, pageName);
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

function UpdateContentToPage(currentPage, productData, pageName)
	{
		try
		{
	//////////////////////////////////NORMAL START /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////
	var tfNormal = currentPage.textFrames.everyItem().getElements();
	productFirstPart ='';
	for (var i = 0; i < tfNormal.length; i++) {

		var fullPdtContentFromInDesign = tfNormal[i].contents;
		if(fullPdtContentFromInDesign == '' || fullPdtContentFromInDesign == null || fullPdtContentFromInDesign == undefined)
		{
			continue;
		}		

		if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1 )
		{
			continue;
		}
		///$[FOX080-18|pr]
		var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
		var squareIndex = fullPdtContentFromInDesign.indexOf('[');
		if(dollarIndex == 0 && squareIndex == 1)
		{
			pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
		}
		else
		{
			pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
		}
		if(pdtFromInDesign == '')
		{
			continue;
		}
		if(fullPdtContentFromInDesign.indexOf('FOX080-16') == -1 )
		{
			///continue;
		}

		productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
		/*
		if(fullPdtContentFromInDesign.indexOf('RC6979') == -1)
		{
		continue;
		}
		*/

		if (fullPdtContentFromInDesign != null 
			&& fullPdtContentFromInDesign != ''
			&& fullPdtContentFromInDesign != undefined)
			 {
			///alert(fullPdtContentFromInDesign);
			for (var g = 0; g < productData.length; g++) {
				try {
					var pdtFromAppData = productData[g].Product;
					///alert(globalSuccessValues);
					if (pdtFromInDesign == pdtFromAppData)
					{						
						newTextForIndesign = '';								
						var weightFromAppData = productData[g].Weight;
						var rateFromAppData = productData[g].Price;
						var lengthFromAppData = productData[g].Length;
						newTextForIndesign = GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"I")
						///alert('newTextForIndesign'+newTextForIndesign);
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
					}
				}
				catch (er) {
					alert('UpdateContentToPage Normal section-' + er);
				}

			}///productData loop

		}//[ atleast one

	} //text frame close
			//////////////////////////////////NORMAL END /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////			
		}
		catch(er)
		{
			alert('UpdateContentToPage'+er);
		}
}

function UpdateContentToGroup(grp, productData, pageName)
{
	try
	{
		if(pageName == null || pageName == undefined || pageName == '')
		{
			///alert('pageName- is null '+pageName);
			return;
		}
		///alert('pageName-'+pageName);
		if(grp == null || grp == undefined || grp == '')
		{
			///alert('grp- is null '+grp);
			return;
		}

		if(grp != null && grp != undefined && grp.textFrames.length ==0)
		{
			return;
		}

	////	alert('Fn call UpdateContentToGroup-'+productData.length);
		if(productData == null || productData == '' || productData == undefined)
		{
			///alert('productData- is null '+productData);
			return;
		}
		
/////////////////////////////////Groups //////////////////////////////////////////////////
	///	alert(' textFrames.length from group '+ grp.textFrames.length);				
	var productFirstPart = '';
	var pdtFromInDesign = '';
	for (var i = 0; i < grp.textFrames.length; i++) 
	{
		///alert('i-'+i);
		productFirstPart = '';
		pdtFromInDesign = '';
		var tf = grp.textFrames[i];
		var fullPdtContentFromInDesign = tf.contents;
		
		if(fullPdtContentFromInDesign == ''
		|| fullPdtContentFromInDesign == undefined
		|| fullPdtContentFromInDesign == null
		|| fullPdtContentFromInDesign.indexOf('[') == -1 
		|| fullPdtContentFromInDesign.indexOf(']') == -1 )
		{
			continue;
		}		

		if(fullPdtContentFromInDesign.indexOf('FOX080-18') == -1 )
		{
			///continue;
		}
	/*	*/
		
		///$[FOX080-18|pr]
var dollarIndex = fullPdtContentFromInDesign.indexOf('$');
var squareIndex = fullPdtContentFromInDesign.indexOf('[');
if(dollarIndex == 0 && squareIndex == 1)
{
	pdtFromInDesign=GetProductNameFromIndesignTextForTableFormat(fullPdtContentFromInDesign);
}
else
{
	pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
}	
		if(pdtFromInDesign == '' || pdtFromInDesign == null || pdtFromInDesign == undefined)
		{
			continue;
		}		
		
		///alert('pdtFromInDesign-'+pdtFromInDesign);
	///	productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
		///alert('productFirstPart-'+productFirstPart);

			for (var g = 0; g < productData.length; g++) {
				try 
				{
					var pdtFromAppData = productData[g].Product;
					///alert(globalSuccessValues);
					if (pdtFromInDesign == pdtFromAppData)
					{
					///	alert('pdtFromInDesign'+pdtFromInDesign);
						newTextForIndesign = '';								
						var weightFromAppData = productData[g].Weight;
						var rateFromAppData = productData[g].Price;
						var lengthFromAppData = productData[g].Length;
						newTextForIndesign = GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"I")
						////alert('newTextForIndesign'+newTextForIndesign);					
					
						if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
							tf.contents = newTextForIndesign;
							if(stringReturnValue.indexOf(productFirstPart) == -1)
							{
								stringReturnValue += "R12W" + productFirstPart + 'C12L' + pageName;
								////alert('I-> '+stringReturnValue);
							}
							break;
							// found if close
						}						
					}
				}
				catch (er) {
					alert('UpdateContentToGroup productData loop-' + er);
				}
			}///productData loop

	} //text frame close
					
			//	alert('errorReturnValue' + errorReturnValue);
	///	alert('warningReturnValue' + warningReturnValue);
	///	alert('successReturnValue-' + successReturnValue);
	
			}catch(er)
			{
				alert('UpdateContentToGroup aneesh -'+er);
			}
}


function GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,from) {
	var newTextForIndesign = '';
	try
	{
/* 
if(fullPdtContentFromInDesign.indexOf('RC6979-18') == -1)
{
	return "";
}


if(fullPdtContentFromInDesign.indexOf('RC6980-07') == -1 )
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
		for (var inc = 0; inc < indesignProducts.length; inc++) {
			var item = '[' + indesignProducts[inc];
			////alert(inc + ' --> ' + item);
			if(inc ==0)
			{
				///newTextForIndesign += item;
				continue;
			}			

			if(item.indexOf('|') == -1)
			{			
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
						newTextForIndesign += ' ' + lengths[0];
					}
					newTextForIndesign +=  ' ' + lengthFromAppData;					
				}
				else
				{	if(lengths.length > 0)
					{
						newTextForIndesign += lengths[0];
					}
					newTextForIndesign += item;
				}				
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
					if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
					{
						newTextForIndesign +=  rateFromAppData + ' ' + priceSplits[1];
					}
					else
					{
						newTextForIndesign += '$'+ item;
					}
				}
				else
				{
					if(rateFromAppData != '' && rateFromAppData != null && rateFromAppData != undefined)
					{
						newTextForIndesign +=  rateFromAppData;
					}
					else
					{
						newTextForIndesign +=  item;
					}
					
				}				
			}			
			else {
				newTextForIndesign += item;
				///alert(' newTextForIndesign-'+newTextForIndesign);
			}
			////alert('item-'+item +' - newTextForIndesign-'+newTextForIndesign);
			//if else close
		}// for loop end
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