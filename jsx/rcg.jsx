
var globalSuccessValues = '';
var wholeProductFromInDesign = [];
var successReturnValue = '';
var errorReturnValue = '';
var warningReturnValue = '';
var isItaNewPageForError = false;
var isItaNewPageForWarning = false;
var isItaNewPageForSucess = false;
var stringReturnValue = '';

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
				if(allPages[p].name != '214')
			{
					continue;
			}*/
				
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
					///try{
					var eachGroupI = allGroups[i];			
					///GetContentFromPage(eachGroupI, productDatais, pageName);		
					GetContentFromGroup(eachGroupI, productData, pageName);				
					var allGroupJ=	allGroups[i].groups;
					///alert('J Group length-' + allGroupJ.length);
						for (j=0;j < allGroupJ.length;j++)
						{	
							///try
							///{						
							var eachGroupJ = allGroupJ[j];													
							GetContentFromGroup(eachGroupJ, productData, pageName);																		
							var allGroupK=	allGroupJ[j].groups;
								for (k=0;k < allGroupK.length;k++)
								{
									//try{
										var eachGroupK = allGroupK[k];		
										GetContentFromGroup(eachGroupK, productData. pageName);										
										var allGroupL=	allGroupK[k].groups;
										for (l=0;l < allGroupL.length;l++)
										{
											///try
											///{
												GetContentFromGroup(allGroupL[l], productData, pageName);
											///}
											///catch(er)
											///{
											//alert('Error L loop '+er);
											///}
										}	
								///	}
									//catch(er)
									//{
									//alert('Error k loop '+er);
									//}					
								}
							///}
							///catch(er)
							///{
							///alert('Error j loop '+er);
							///}								
						}
					///}
					///catch(er)
					//{
				//	alert('Error i loop '+er);
				///	}							
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
				///alert('fullPdtContentFromInDesign '+fullPdtContentFromInDesign);
				if(CheckAnyErrorInProduct(fullPdtContentFromInDesign))
				{
					productStatus = 103;		/// 103 -> Product In Error,
					wholeProductFromInDesign.push(
						{
							'PageName': pageName,
							'Product': GetProductNameFromInvalidSKU(fullPdtContentFromInDesign),
							'IsError': true,
							'IsWarning': false,
							'IsItaNewPage': isItaNewPageForError
						});


					if (errorReturnValue.length == 0) {
						errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + fullPdtContentFromInDesign + "C12L1C12L0C12LI";
					}
					else {
						errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + fullPdtContentFromInDesign + "C12L1C12L0C12LI";
					}
					isItaNewPageForError = false;
					///alert('continue ');
					continue;
				}
				////alert('Before format - '+fullPdtContentFromInDesign);
				pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
				if(pdtFromInDesign == '')
				{
							///alert(fullPdtContentFromInDesign+' is Empty')
							continue;
				}
				///alert('fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'NORMAL'+'pdtFromInDesign-'+pdtFromInDesign);
				/*	
				if(fullPdtContentFromInDesign.indexOf('BRC2765') == -1)
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
					///alert('productData.length'+productData.length);
					for (var g = 0; g < productData.length; g++) {
						try 
						{
							newTextForIndesign = '';
							var pdtFromAppData = productData[g].Product;
							///alert('pdtFromAppData->'+pdtFromAppData);
							var weightFromAppData = productData[g].Weight;
							var rateFromAppData = productData[g].Price;
							var lengthFromAppData = productData[g].Length;

							if (pdtFromInDesign == pdtFromAppData) 
							{
								///alert('Product found');
								/// Product found in indesign								
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

					///alert('fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)
					if (productStatus == 102) //// Product missing from group 	/// 102 -> Product In Warning
					{
						////alert(fullPdtContentFromInDesign + ' Product In Warning');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForWarning
							});
						if (warningReturnValue.length == 0) {
							warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else 
						{
							warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForWarning = false;
					}
					else if (productStatus == 101) /// 101 -> Product In Success,
					{
						////alert(pdtFromInDesign + 'Product In Success');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForSucess
							});
						if (successReturnValue.length == 0) {
							successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else {
							successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForSucess = false;
						////alert('successReturnValue-'+successReturnValue);
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
					///alert('fullPdtContentFromInDesign from group-'+fullPdtContentFromInDesign)
					if(CheckAnyErrorInProduct(fullPdtContentFromInDesign))
					{
						productStatus = 103;		/// 103 -> Product In Error,
									wholeProductFromInDesign.push(
										{
											'PageName': pageName,
											'Product': GetProductNameFromInvalidSKU(fullPdtContentFromInDesign),
											'IsError': true,
											'IsWarning': false,
											'IsItaNewPage': isItaNewPageForError
										});


									if (errorReturnValue.length == 0) {
										errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + fullPdtContentFromInDesign + "C12L1C12L0C12LI";
									}
									else {
										errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + fullPdtContentFromInDesign + "C12L1C12L0C12LI";
									}
									isItaNewPageForError = false;

						continue;
					}

					pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
					if(pdtFromInDesign == '')
						{
							continue;
						}
				///	alert('fullPdtContentFromInDesign'+fullPdtContentFromInDesign+' pdtFromInDesign-'+pdtFromInDesign);
					anyDataExists = true;					
						productStatus = 101;//success					
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try {
								newTextForIndesign = '';
								var pdtFromAppData = productData[pdt].Product;
								var weightFromAppData = productData[pdt].Weight;
								var rateFromAppData = productData[pdt].Price;
								var lengthFromAppData = productData[pdt].Length;

								if (pdtFromInDesign == pdtFromAppData) 
								{								
									productStatus = 101;									
									break;
								} // found if close
								else {
									productStatus = 102;	/// 102 -> Product In Warning,
								}

								///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
							}
							catch (er) {
								alert('Group section-' + er);
							}

						} //productData loop closed

						if (productStatus == 102) //// Product missing 102 -> Product In Warning
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForWarning
								});
							if (warningReturnValue.length == 0) {
								warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForWarning = false;

						}
						else if (productStatus == 101) /// 101 -> Product In Success,
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForSucess
								});
							if (successReturnValue.length == 0) {
								successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForSucess = false;
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
		if(inc == 0)/// SKU Parent name
		{
			var removedPortion = spaceSplits[inc];
			return fullPdtContentFromInDesign.replace(removedPortion,'');
		}
	}
}

function CheckAnyErrorInProduct(fullPdtContentFromInDesign)
{
	if(fullPdtContentFromInDesign == ''
	  || fullPdtContentFromInDesign == null
	  || fullPdtContentFromInDesign == undefined) 
	{
		return true;								
	}

	if(fullPdtContentFromInDesign.indexOf(']g') == -1
	  || fullPdtContentFromInDesign.indexOf('$[') == -1) 
	{
		return true;								
	}

	var spaceSplits = fullPdtContentFromInDesign.split(' ');
	for (var inc = 0; inc < spaceSplits.length; inc++) {
		if(inc == 0)/// SKU Parent name
		{

		}
		else if(inc == 1)///Length
		{
			if(spaceSplits[inc].indexOf('[') == -1 || spaceSplits[inc].indexOf(']') == -1)
			{
				return true;
			}
			else if(spaceSplits[inc].indexOf('|') == -1)
			{
				return true;
			}			
		}
		else if(inc == 2)///Weight
		{
			if(spaceSplits[inc].indexOf('[') == -1 || spaceSplits[inc].indexOf(']') == -1)
			{
				return true;
			}
			else if(spaceSplits[inc].indexOf('|') == -1)
			{
				return true;
			}
		}
		else if(inc == 3)///Price
		{
			if(spaceSplits[inc].indexOf('[') == -1 || spaceSplits[inc].indexOf(']') == -1)
			{
				return true;
			}
			else if(spaceSplits[inc].indexOf('|') == -1)
			{
				return true;
			}
		}
	}

	return false;
}

/////////////////////////////////////////////////////////////////////////////////////////

function GetProductNameFromIndesignText(fullPdtContentFromInDesign)
{
	try
	{
	///alert('from GetProductNameFromIndesignText jsx')
		if(fullPdtContentFromInDesign.indexOf('$') > -1 && fullPdtContentFromInDesign.indexOf('[') > -1 && fullPdtContentFromInDesign.indexOf(']') > -1)
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
			
		/*	if(allPages[p].name != '213')
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
		if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1 )
		{
			continue;
		}
		pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
		if(pdtFromInDesign == '')
		{
			continue;
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
					if (globalSuccessValues != '' 
					&& globalSuccessValues.length > 0
					&& globalSuccessValues.indexOf(pdtFromInDesign) > -1
					&& pdtFromInDesign == pdtFromAppData)
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
		////alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign);
		pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);		
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
					if (globalSuccessValues != '' 
					&& globalSuccessValues.length > 0
					&& globalSuccessValues.indexOf(pdtFromInDesign) > -1
					&& pdtFromInDesign == pdtFromAppData)
					{
						newTextForIndesign = '';								
						var weightFromAppData = productData[g].Weight;
						var rateFromAppData = productData[g].Price;
						var lengthFromAppData = productData[g].Length;
						newTextForIndesign = GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"I")
						///alert('newTextForIndesign'+newTextForIndesign);
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
if(fullPdtContentFromInDesign.indexOf('BRC2765') == -1)
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
			var item = indesignProducts[inc];
			 ///alert(	item);
			//// First Item
			if (item.indexOf('[') == -1 && item.indexOf(']') == -1 && item.indexOf('$') == -1 && inc == 0) {
				newTextForIndesign += item;
			}
			else if (item.indexOf(']') > -1 && item.indexOf('ln') > -1) 
			{
				newTextForIndesign +=  ' ' + lengthFromAppData;
			}			
			else if (item.indexOf(']g') > -1 && item.indexOf('wt') > -1)//Weight
			{
				newTextForIndesign +=  ' ' + weightFromAppData + 'g';
			}			
			else if (item.indexOf('pr]') > -1)////Price
			{
				var priceSplits = item.split(']');
				if(priceSplits.length > 1)
				{
					newTextForIndesign +=  ' $' + rateFromAppData + ' ' + priceSplits[1];
				}
				else
				{
					newTextForIndesign +=  ' $' + rateFromAppData;
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
////alert('9846 '+newTextForIndesign);
	}
	catch(er)
	{
		alert('GenerateNewCaptionForProduct-' + er);
	}
	return newTextForIndesign;
}//function close








///-------------------------------UNWANTED CODE----------------------------------------------



function GetProductDetailsFromIndesignFile_old(productData) {
	////alert('GetProductDetailsFromIndesignFile'+productData);
	
	var pdtFromInDesign = '';
	try {
		var productStatus = 101;
		/// 101 -> Product In Success,
		/// 102 -> Product In Warning,
		/// 103 -> Product In Error,

		if (productData == null || productData == '' || productData == undefined) {
			////alert('There is no product details!');
			return errorReturnValue;
		}
		////alert( 'GetProductDetailsFromIndesignFile--- in jsx productData.length-'+productData.length);
		////return 'this is the message from getMessageFromUtil';

		/////////////////////////////////GROUP START//////////////////////////////////////////////////////
		//set active document.
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
		var isItaNewPageForError = false;
		var isItaNewPageForWarning = false;
		var isItaNewPageForSucess = false;
		var pageName = '';
		 ///alert('Total pages-'+allPages.length);
		var anyDataExists = false;
		for (var p = 0; p < allPages.length; p++) {
			/* 
			if(p > 0)
			{
				continue;
			}
					
			if(allPages[p].name != '213')
			{
				continue;
			}	*/			
			
			isItaNewPageForError = true;
			isItaNewPageForWarning = true;
			isItaNewPageForSucess = true;
			currentPage = allPages[p];
			pageName = currentPage.name;		
			///alert('pg.name-'+pageName);
			var groups = currentPage.groups;
			////var tf_ingroup_counter = 0;
			alert('pageName-'+pageName+'Group length-' + groups.length);
			var newTextForIndesign = '';
			for (var g = 0; g < groups.length; g++) 
			{
				var grp = groups[g];


				//////////////////////////////Group Within Group GetProductDetailsFromIndesignFile////////////////////////////////////////////////
				var innerGrps = grp.groups;
				for (var t1 = 0; t1 < innerGrps.length; t1++) {
					var innerGrp = innerGrps[t1];
					for (var t2 = 0; t2 < innerGrp.textFrames.length; t2++) {					
						var tff2 = innerGrp.textFrames[t2];
						var fullPdtContentFromInDesign = tff2.contents;
							if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1)
							{
								continue;
							}
						pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);	
						if(pdtFromInDesign == '')
						{
							continue;
						}					
						///alert('pdtFromInDesign '+pdtFromInDesign+'Within Group'+'pdtFromInDesign-'+pdtFromInDesign);
						if (pdtFromInDesign != null && pdtFromInDesign != ''
							&& pdtFromInDesign != undefined )
							{
								anyDataExists = true;
							productStatus = 101;//success
							///alert(pageName+' ---->'+pdtFromInDesign);		
							for (var pdt = 0; pdt < productData.length; pdt++) {
								try 
								{
									newTextForIndesign = '';
									var pdtFromAppData = productData[pdt].Product;
									var weightFromAppData = productData[pdt].Weight;
									var rateFromAppData = productData[pdt].Price;
									var lengthFromAppData = productData[pdt].Length;
									if (fullPdtContentFromInDesign != null && fullPdtContentFromInDesign != ''
										&& fullPdtContentFromInDesign != undefined && fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1) {
										
										if (fullPdtContentFromInDesign.indexOf(']g') == -1
											|| fullPdtContentFromInDesign.indexOf('$[') == -1) {
											productStatus = 103;		/// 103 -> Product In Error,
											wholeProductFromInDesign.push(
												{
													'PageName': pageName,
													'Product': pdtFromInDesign,
													'IsError': true,
													'IsWarning': false,
													'Status': Status,
													'IsItaNewPage': isItaNewPageForError
												});


											if (errorReturnValue.length == 0) {
												errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LGG";
											}
											else {
												errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LGG";
											}
											isItaNewPageForError = false;
											///alert(errorReturnValue);
										}
										else
										{
											productStatus = 101;									
										}

										break;
									} // found if close
									else 
									{
										productStatus = 102;	/// 102 -> Product In Warning,
									}

									///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
								}
								catch (er) {
									alert('Group section-' + er);
								}

							} //productData loop closed

							if (productStatus == 102) //// Product missing 102 -> Product In Warning
							{
								wholeProductFromInDesign.push(
									{
										'PageName': pageName,
										'Product': pdtFromInDesign,
										'IsError': false,
										'IsWarning': true,
										'IsItaNewPage': isItaNewPageForWarning
									});
								if (warningReturnValue.length == 0) {
									warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								else {
									warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								isItaNewPageForWarning = false;

							}
							else if (productStatus == 101) /// 101 -> Product In Success,
							{
								wholeProductFromInDesign.push({
										'PageName': pageName,
										'Product': pdtFromInDesign,
										'IsError': false,
										'IsWarning': true,
										'IsItaNewPage': isItaNewPageForSucess
									});
								if (successReturnValue.length == 0) {
									successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								else {
									successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LGG";
								}
								isItaNewPageForSucess = false;
							}

						}/// [ atleast one 
					}//innerGrp.textFrames.length
				}
//////////////////////////////Group Within Group End////////////////////////////////////////////////



/////////////////////////////////Groups ////////////GetProductDetailsFromIndesignFile//////////////////////////////////////
				///	alert('group name '+grp);
				for (var t = 0; t < grp.textFrames.length; t++) {					
					var tff = grp.textFrames[t];
					var fullPdtContentFromInDesign = tff.contents;
					if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1)
					{
						continue;
					}
					pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
					if(pdtFromInDesign == '')
						{
							continue;
						}
				///	alert('fullPdtContentFromInDesign'+fullPdtContentFromInDesign+' pdtFromInDesign-'+pdtFromInDesign);
					if (fullPdtContentFromInDesign != null && fullPdtContentFromInDesign != ''
						&& fullPdtContentFromInDesign != undefined 
						&& fullPdtContentFromInDesign.indexOf('[') > -1
						&& fullPdtContentFromInDesign.indexOf(']') > -1) {
							anyDataExists = true;
					
						productStatus = 101;//success					
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try {
								newTextForIndesign = '';
								var pdtFromAppData = productData[pdt].Product;
								var weightFromAppData = productData[pdt].Weight;
								var rateFromAppData = productData[pdt].Price;
								var lengthFromAppData = productData[pdt].Length;

								if (fullPdtContentFromInDesign != null 
									&& fullPdtContentFromInDesign != ''
									&& fullPdtContentFromInDesign != undefined 
									&& fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1) {
								
									if ( fullPdtContentFromInDesign.indexOf(']g') == -1
										|| fullPdtContentFromInDesign.indexOf('$[') == -1) {
										productStatus = 103;		/// 103 -> Product In Error,
										wholeProductFromInDesign.push(
											{
												'PageName': pageName,
												'Product': pdtFromInDesign,
												'IsError': true,
												'IsWarning': false,
												'Status': Status,
												'IsItaNewPage': isItaNewPageForError
											});


										if (errorReturnValue.length == 0) {
											errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LG";
										}
										else {
											errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LG";
										}
										isItaNewPageForError = false;
										///alert(errorReturnValue);
									}
									else
									{
										productStatus = 101;									
									}
									break;
								} // found if close
								else {
									productStatus = 102;	/// 102 -> Product In Warning,
								}

								///alert('fullPdtContentFromInDesign-'+fullPdtContentFromInDesign+' | pdtFromAppData-'+pdtFromAppData+' | newTextForIndesign-'+newTextForIndesign);
							}
							catch (er) {
								alert('Group section-' + er);
							}

						} //productData loop closed


						if (productStatus == 102) //// Product missing 102 -> Product In Warning
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForWarning
								});
							if (warningReturnValue.length == 0) {
								warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForWarning = false;

						}
						else if (productStatus == 101) /// 101 -> Product In Success,
						{
							wholeProductFromInDesign.push(
								{
									'PageName': pageName,
									'Product': pdtFromInDesign,
									'IsError': false,
									'IsWarning': true,
									'IsItaNewPage': isItaNewPageForSucess
								});
							if (successReturnValue.length == 0) {
								successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							else {
								successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LG";
							}
							isItaNewPageForSucess = false;
						}

					}/// [ atleast one 
				}//textFrames close
			}/// group close

			/////////////////////////////////GROUP CLOSE////////////GetProductDetailsFromIndesignFile/////////////////////////////////////////

			
			//////////////////////////////////NORMAL START /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////
			/////var tf = app.documents[0].textFrames.everyItem().getElements();	
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			///alert('Normal nnnn   -'+ tf.length);
			////alert('Normal-'+ tfNormal.length);
			for (var i = 0; i < tfNormal.length; i++) {
				
				var fullPdtContentFromInDesign = tfNormal[i].contents;
				if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1)
				{
					continue;
				}
				pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
				if(pdtFromInDesign == '')
						{
							continue;
						}
				///alert('fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'NORMAL'+'pdtFromInDesign-'+pdtFromInDesign);
				/*	
				if(fullPdtContentFromInDesign.indexOf('BRC2765') == -1)
				{
					continue;
				}
				*/
				////alert('Normal fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'pageName-'+pageName);
				if (fullPdtContentFromInDesign != null 
					&& fullPdtContentFromInDesign != ''
					&& fullPdtContentFromInDesign != undefined 
					&& fullPdtContentFromInDesign.indexOf('[') > -1
					&& fullPdtContentFromInDesign.indexOf(']') > -1) {
						anyDataExists = true;
					productStatus = 101;
					/// 101 -> Product In Success,
					/// 102 -> Product In Warning,
					/// 103 -> Product In Error,
					///alert('productData.length'+productData.length);
					for (var g = 0; g < productData.length; g++) {
						try {

							newTextForIndesign = '';
							var pdtFromAppData = productData[g].Product;
							///alert('pdtFromAppData->'+pdtFromAppData);
							var weightFromAppData = productData[g].Weight;
							var rateFromAppData = productData[g].Price;
							var lengthFromAppData = productData[g].Length;

							if (fullPdtContentFromInDesign != null 
								&& fullPdtContentFromInDesign != ''
								&& fullPdtContentFromInDesign != undefined 
								&& fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1) {
								///alert('Product found');
								/// Product found in indesign
								var indexOfweight = fullPdtContentFromInDesign.indexOf(']g') ;
								var indexOfPrice = fullPdtContentFromInDesign.indexOf('$[');
								///alert('indexOfweight='+indexOfweight+'indexOfPrice- '+indexOfPrice+'productStatus'+productStatus);
								if (indexOfweight == -1  || indexOfPrice == -1) {
									///	alert(fullPdtContentFromInDesign + 'Normal error fullPdtContentFromInDesign '+fullPdtContentFromInDesign+'pageName-'+pageName);
									productStatus = 103;		/// 103 -> Product In Error,
									wholeProductFromInDesign.push(
										{
											'PageName': pageName,
											'Product': pdtFromInDesign,
											'IsError': true,
											'IsWarning': false,
											'IsItaNewPage': isItaNewPageForError
										});


									if (errorReturnValue.length == 0) {
										errorReturnValue += (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LI";
									}
									else {
										errorReturnValue += "R12W" + (isItaNewPageForError == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L1C12L0C12LI";
									}
									isItaNewPageForError = false;
								}
								else
								{
									productStatus = 101;									
								}

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

					///alert('fullPdtContentFromInDesign-' + fullPdtContentFromInDesign + 'productStatus-'+productStatus)
					if (productStatus == 102) //// Product missing from group 	/// 102 -> Product In Warning
					{
						////alert(fullPdtContentFromInDesign + ' Product In Warning');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForWarning
							});
						if (warningReturnValue.length == 0) {
							warningReturnValue += (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else 
						{
							warningReturnValue += "R12W" + (isItaNewPageForWarning == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForWarning = false;

					}
					else if (productStatus == 101) /// 101 -> Product In Success,
					{
						////alert(pdtFromInDesign + 'Product In Success');
						wholeProductFromInDesign.push(
							{
								'PageName': pageName,
								'Product': pdtFromInDesign,
								'IsError': false,
								'IsWarning': true,
								'IsItaNewPage': isItaNewPageForSucess
							});
						if (successReturnValue.length == 0) {
							successReturnValue += (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						else {
							successReturnValue += "R12W" + (isItaNewPageForSucess == true ? "1" : "0") + 'C12L' + pageName + 'C12L' + pdtFromInDesign + "C12L0C12L1C12LI";
						}
						isItaNewPageForSucess = false;
						////alert('successReturnValue-'+successReturnValue);
					}

				}//[ atleast one
				else
				{
					///alert('Invalid entry')
				}

			} //text frame close
			//////////////////////////////////NORMAL END /////////GetProductDetailsFromIndesignFile////////////////////////////////////////////			


		}//page loop close

//alert('errorReturnValue'+errorReturnValue);
///alert('warningReturnValue'+warningReturnValue);
///alert('successReturnValue-'+successReturnValue);
			if(anyDataExists)
			{
				return (errorReturnValue + "T123T" + warningReturnValue + "T123T" + successReturnValue);
			}
			else{
				return "There is no valid data in the document";
			}
	}
	catch (er) {
		//alert('Error GetProductDetailsFromIndesignFile-' + er)
		return "An error occurred! " + er;
	}
}




function UpdateProductDetailsIntheIndesignFile_OLD(productData) {
	///alert('UpdateProductDetailsIntheIndesignFile');
	///globalSuccessValues = successValues;
	///alert('UpdateProductDetailsIntheIndesignFile globalSuccessValues' + globalSuccessValues);
	var stringReturnValue = '';
	try {

		if (productData == null || productData == '' || productData == undefined) {
			return stringReturnValue;
		}

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

		/////////////////////////////////GROUP INDESIGN UPDATE START UpdateProductDetailsIntheIndesignFile//////////////////////////////////////////////////////
		//set active document.
		var myDoc = app.activeDocument;
		//probably the same thing....
		var curDoc = app.documents[0];
		//get pages 
		var allPages = curDoc.pages;
		var pageName = '';
		////alert('Total pages-'+allPages.length);
		var indexFileName ="Index ";
		for (var p = 0; p < allPages.length; p++) {
			currentPage = allPages[p];
			pageName = currentPage.name;
			if(p == 0)
			{
				indexFileName += pageName;
			}
			if(p == allPages.length-1)
			{
				indexFileName +='-'+ pageName;
			}
			/*
			if(p > 0)
			{
				continue;
			}
			*/
			////alert('page name '+ allPages[p].name);
			
			var pg = app.activeDocument.pages[0];
			///alert('pg.name-'+pageName);
			var groups = currentPage.groups;
			////var tf_ingroup_counter = 0;
			///alert('pageName-'+pageName+'Group length-' + groups.length);
			var newTextForIndesign = '';
			var productFirstPart= '';
			for (var g = 0; g < groups.length; g++) {
				var grp = groups[g];
				//////////////////////////////Group Within Group INDESIGN UPDATE UpdateProductDetailsIntheIndesignFile////////////////////////////////////////////////
				var innerGrps = grp.groups;
				for (var t1 = 0; t1 < innerGrps.length; t1++) {
					var innerGrp = innerGrps[t1];
					for (var t2 = 0; t2 < innerGrp.textFrames.length; t2++) 
					{	
						var fullPdtContentFromInDesign = innerGrp.textFrames[t2].contents;
						if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1)
						{
							continue;
						}
						pdtFromInDesign = GetProductNameFromIndesignText(fullPdtContentFromInDesign);
						if(pdtFromInDesign == '')
						{
							continue;
						}
						productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
						
						if (fullPdtContentFromInDesign != null 
							&& fullPdtContentFromInDesign != ''
							&& fullPdtContentFromInDesign != undefined) {
							///	alert(pageName+' ---->'+fullPdtContentFromInDesign);
							for (var pdt = 0; pdt < productData.length; pdt++) {
								try {
									if (globalSuccessValues != '' 
									&& globalSuccessValues.length > 0
									&& globalSuccessValues.indexOf(pdtFromInDesign) > -1
									&& fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1)
									{
									newTextForIndesign = '';
									var pdtFromAppData = productData[pdt].Product;
									var weightFromAppData = productData[pdt].Weight;
									var rateFromAppData = productData[pdt].Price;
									var lengthFromAppData = productData[pdt].Length;
									newTextForIndesign = GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData,"G");
									if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
										innerGrp.textFrames[t2].contents = newTextForIndesign;
											if(stringReturnValue.indexOf(productFirstPart) == -1)
											{
												stringReturnValue += "R12W" + productFirstPart + 'C12L' + pageName;
												////alert('GG-> '+stringReturnValue);
											}										
										break;
										// found if close
									}
								}
								}
								catch (er) {
									alert('UpdateProductDetailsIntheIndesignFile Group section-' + er);
								}

							} //productData loop closed

						}/// [ atleast one 
					} //innerGrp.textFrames.length
				}


				/////////////////////////////////Groups INDESIGN UPDATE UpdateProductDetailsIntheIndesignFile//////////////////////////
				///	alert('group name '+grp);
				productFirstPart='';
				for (var t = 0; t < grp.textFrames.length; t++) {
					var fullPdtContentFromInDesign = grp.textFrames[t].contents;
					if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1)
					{
						continue;
					}
					pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
					if(pdtFromInDesign == '')
						{
							continue;
						}
					productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
					if (fullPdtContentFromInDesign != null 
						&& fullPdtContentFromInDesign != ''
						&& fullPdtContentFromInDesign != undefined)
						 {
						///	alert(pageName + ' ---->' + fullPdtContentFromInDesign);
						for (var pdt = 0; pdt < productData.length; pdt++) {
							try {
								if (globalSuccessValues != '' 
								&& globalSuccessValues.length > 0
								&& globalSuccessValues.indexOf(pdtFromInDesign) > -1
								&& fullPdtContentFromInDesign.indexOf(pdtFromAppData) > -1)
								{
									newTextForIndesign = '';
									var pdtFromAppData = productData[pdt].Product;
									var weightFromAppData = productData[pdt].Weight;
									var rateFromAppData = productData[pdt].Price;
									var lengthFromAppData = productData[pdt].Length;
									newTextForIndesign =  GenerateNewCaptionForProduct(fullPdtContentFromInDesign, pdtFromAppData, weightFromAppData, rateFromAppData, lengthFromAppData, "GG");
									if (newTextForIndesign != '' && newTextForIndesign.length > 0) {
										grp.textFrames[t].contents = newTextForIndesign;
										if(stringReturnValue.indexOf(productFirstPart) == -1)
										{
											stringReturnValue += "R12W" + productFirstPart + 'C12L' + pageName;
											////alert('G-> '+stringReturnValue);
										}
										break;
										// found if close
									}
								}
							}
							catch (er) {
								alert('UpdateProductDetailsIntheIndesignFile inner Group section-' + er);
							}

						} //productData loop closed

					}/// [ atleast one 
				}//textFrames close
			}/// group close


			/////////////////////////////////GROUP INDESIGN UPDATE CLOSE UpdateProductDetailsIntheIndesignFile//////////////////////////////////////////////////////


			//////////////////////////////////NORMAL INDESIGN UPDATE START UpdateProductDetailsIntheIndesignFile /////////////////////////////////////////////////////
			/////var tf = app.documents[0].textFrames.everyItem().getElements();	
			var tfNormal = currentPage.textFrames.everyItem().getElements();
			///alert('Normal nnnn   -'+ tfNormal.length);
			////alert('Normal-'+ tfNormal.length+'successReturnValue'+globalSuccessValues);
			productFirstPart ='';
			for (var i = 0; i < tfNormal.length; i++) {

				var fullPdtContentFromInDesign = tfNormal[i].contents;
				if(fullPdtContentFromInDesign.indexOf('[') == -1 || fullPdtContentFromInDesign.indexOf(']') == -1 )
				{
					continue;
				}
				pdtFromInDesign=GetProductNameFromIndesignText(fullPdtContentFromInDesign);
				if(pdtFromInDesign == '')
						{
							continue;
						}
				productFirstPart = GetProductFirstPart(fullPdtContentFromInDesign);
				/*
				if(fullPdtContentFromInDesign.indexOf('BRC2765') == -1)
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
							if (globalSuccessValues != '' 
							&& globalSuccessValues.length > 0
							&& globalSuccessValues.indexOf(pdtFromInDesign) > -1
							&& pdtFromInDesign.indexOf(pdtFromAppData) > -1)
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
							alert('UpdateProductDetailsIntheIndesignFile Normal section-' + er);
						}

					}///productData loop

				}//[ atleast one

			} //text frame close
			//////////////////////////////////NORMAL END UpdateProductDetailsIntheIndesignFile/////////////////////////////////////////////////////			

		}//page loop close

		indexFileName = indexFileName +'.csv';
		return stringReturnValue + "R34W"  +indexFileName;
	}
	catch (er) {
		alert('Error UpdateProductDetailsIntheIndesignFile-' + er)
	}
}


