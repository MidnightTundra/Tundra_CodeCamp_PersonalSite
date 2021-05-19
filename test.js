document.addEventListener('DOMContentLoaded', function() {
    jQuery(function($){
        //Gets Ids from string of characters with html (#)ids relating to element
        function getIds (id) {
            let list = id.split(' ');
            let idReturn = [], item;
            for(let i = 0; i < list.length; i++) {
                 item = document.getElementById(list[i]);
                 if(item) {
                     idReturn.push(item);
                     
                 }
            }
            return (idReturn);
        }
        
        //My function that creates a 2 dimensional array
        function TwoDArray(row, length) {
            let array = new Array(row)
            for (i = 0; i < row; i++) {
            array[i] = new Array(length);
            }
            return array;
        }
        
        //Manipulates the valueIndicator variable and it controls the display for second section
        function changeSection (indicator) {
            if ($(window).width() > 768) {
            for(let i = 0; i < midsectArray.length; i++) {
                if (i != indicator) {
                    for (let j = 0; j < test[i].length; j++) {
                        $(test[i][j]).removeClass('fadeInClass');
                        $(test[i][j]).addClass('hideClass');
                        $(test[i][j]).css('display', 'none');
                        
                    }
                }
                else if(i == indicator) {
                    for (let t = 0; t < test[indicator].length; t++) {
                        $(test[indicator][t]).removeClass('hideClass');
                        $(test[indicator][t]).addClass('fadeInClass');
                         $(test[indicator][t]).css('display', 'flex');
                        
                        
                    }
                }
            }
            }
        }
        
        let valueIndicator = 0;
        //function made the switch the valueIndicator variable based on operator and value
        function switchValue (value, operator) {
            if (valueIndicator <= 0 && operator == '-') {
                valueIndicator += midsectArray.length - 1;
            }
            else if (valueIndicator >= (midsectArray.length - 1) && operator == '+') {
                    valueIndicator = 0;
            }
            else if (operator == '-') {
                valueIndicator -= value;
            }
            else if (operator == '+') {
                valueIndicator += value;
            }
            
            //window.alert('value is switched to' + ' ' + valueIndicator);
        }
        
        
        
        

        let midsectArray = getIds ('sections aboutus contactus');
        let test = TwoDArray(midsectArray.length, 10);
        for(let t = 0; t < midsectArray.length; t++) {
                test[t] = midsectArray[t].getElementsByTagName('article');
        }
        
        
        //assigns values of hidden "divs" to current display of the section (old test function)
        function pushDiv(indicator) {
            document.getElementById('push-div').innerHTML = midsectArray[indicator].innerHTML;
        }
        //pushDiv(valueIndicator);
        
        changeSection(valueIndicator);
        
        //window.alert(midsectArray.length + "hey"); DEBUG
        
        
    $('.value-left').each(function(i) {
        $(this).click(function () {
            switchValue(1, '-');
            changeSection(valueIndicator);
            //pushDiv(valueIndicator);
        });
    });
    
     $('.value-right').each(function(i) {
          $(this).click(function () {
            switchValue(1, '+');
            changeSection(valueIndicator);
            //pushDiv(valueIndicator);
        });
    });
    $('.switchToContact').each(function(i) {
        $(this).click(function () {
            valueIndicator = 2;
            changeSection(valueIndicator);
        });
    });
 
    $('.dynamicbutton').each(function(i){
        $(this).click(function(){ 
             document.getElementById('contactus').innerHTML = document.getElementById('sections').innerHTML;
              window.alert(test[1][0] + "hey");
        //$('.showclick').eq(i).show();
        
       
        if($('.clicktoshow').css('opacity') == 0) {
            $('.clicktoshow').addClass('fadeInClass');
            
            //$(midsectArray[0]).addClass('fadeInClass');
           
           
            for (let i = 0; i < test[0].length; i++) {
               $(test[0][i]).addClass('fadeInClass');
                
            }
            $('.clicktoshow').removeClass('hideClass');
            
        //$('.clicktoshow').eq(i).hide();
        }
        else {
            $('.clicktoshow').removeClass('fadeInClass');
         $('.clicktoshow').addClass('hideClass');
          for (let i = 0; i < test[0].length; i++) {
               $(test[0][i]).addClass('hideClass');
                
            }
         //$(midsectArray[0]).addClass('hideClass');
        
        }
            }); 
        });
    }); 
});