window.onload = function(){
    var curclick;
    var curcss;
    var editmode = 'False';
    var num=0;
    var curwindow = 1;
    var windownum=1;
    var link = 'False';

    document.cookie = "crossCookie=bar; SameSite=None; Secure";

    $("#extract-file").click(function(){
        if(confirm("정말 파일을 생성 하시겠습니까?") == true){
            var data = $('#resultpage').html();
            data = data.replace('<!--','');
            data = data.replace('-->','');
            data = data.replace('//addwindownum','var windownum = '+String(windownum));
            data = '<body style="margin:0px;">' + data + '</body>'
            data = data.replace(/<textarea/gi,'<textarea readonly');
            data = data.replace(/resize: both/gi,'resize: none');
            console.log(data);
            var properties = {type : 'text/plain'};
            try{
                file = new File([data],'text.html',properties);
            }catch(e){
                file = new Blob([data],properties);
            }
            var url = URL.createObjectURL(file);
            document.getElementById('link').href = url;
        }
    })

    function changewindow(window){
        for(let i = 1; i <= windownum;i++)
        {
            $('.window'+String(i)).css('display','none');
        }
        $('.window'+String(window)).css('display','block');
        curwindow = window;
        $("#show-current-window").html('Current Window : '+curwindow);
    }

    $(".window-tab").click(function(event){
        for(let i = 1; i <= windownum;i++)
        {
            if(event.target.id === 'window'+String(i))
            {
                changewindow(i);
            }
        }
    })

    $('#add-window').click(function(){
        var btn = document.createElement('button');
        btn.style.width = "80px";
        windownum += 1;
        btn.id = 'window'+String(windownum);
        document.querySelector(".window-tab").appendChild(btn);
        $('#'+btn.id).html('window'+String(windownum));

        var opt = document.createElement('option');
        opt.text = 'Link window'+String(windownum);
        opt.value = 'window'+String(windownum);

        document.getElementById('window-function-select').add(opt);
        console.log('!~~');

        var window = document.createElement('div');
        window.className = btn.id;
        document.querySelector(".resultpage").appendChild(window);
        $('.'+window.className).css('display','none');
        $('.'+window.className).css('bottom',0);
        $('.'+window.className).css('right',0);
        $('.'+window.className).css('width',"100%");
        $('.'+window.className).css('height',"100%");
        $('.'+window.className).css('overflow',"auto");
        $('.'+window.className).css('margin','0');
    })

    $('#window-tab-btn').click(function(){
        $('.window-tab').css("visibility","visible");
        $('.element-tab').css("visibility","hidden");
        $('#window-tab-btn').css("background-color","skyblue");
        $('#add-element-tab-btn').css("background-color","white");
    })
    $("#add-element-tab-btn").click(function(){
        $('.window-tab').css("visibility","hidden");
        $('.element-tab').css("visibility","visible");
        $('#window-tab-btn').css("background-color","white");
        $('#add-element-tab-btn').css("background-color","skyblue");
    })

    $(".resultpage").click(function(event){
        if(event.target.id == "resultpage") 
        {
            $("#name-input").val("")
            $("#text-input").val("")
            $("#font-size-input").val("")
        }
        if(event.target.id != "resultpage" && event.target.id != "") 
        {   
            /*if(event.target.id == "")
            {
                toastr.warning("Set element name");
            }*/
            $("#name-input").val(event.target.id);
            if(event.target.tagName === 'DIV'){
                $("#text-input").val("");
            }
            else{$("#text-input").val(event.target.innerHTML);}
            $("#font-size-input").val(window.getComputedStyle(event.target, null).getPropertyValue('font-size').replace("px",""));
            $("#border-radius-input").val(window.getComputedStyle(event.target, null).getPropertyValue('border-radius').replace("px",""));
            $("#border-width-input").val(window.getComputedStyle(event.target, null).getPropertyValue('border-width').replace("px",""));
            document.getElementById("element-background-opacity").value = window.getComputedStyle(event.target, null).getPropertyValue('opacity')*100;
        }
        curclick = event.target
    })

///////////////////// Attribute Control //////////////////////

    $("#name-input").change(function(event){
        if(curclick.id != "resultpage") 
        {
            curclick.id = this.value
            toastr.success("Element name set "+this.value)
        }
    })

    $("#text-input").change(function(event){
        if(curclick.id != "resultpage" && curclick.tagName != "DIV") 
        {
            $('#'+curclick.id).html(this.value);
            /*curclick.value = this.value
            curclick.HTML = this.value*/
        }
    })
    

    $("#font-size-input").change(function(){
        if(curclick.id != "resultpage") 
        {
            curclick.style.fontSize = this.value + "px"
        }
    })

    $("#font-color-input").change(function(){
        if(curclick.id != "resultpage")
        {
            curclick.style.color = this.value
        }
    })

    $("#fontname-select").change(function(){
        if(curclick.id == "")
        {
            toastr.error("Set element name");
        }
        $("#"+curclick.id).css("font-family",this.value);
    })

    $('#border-radius-input').change(function(){
        if(curclick.id != "resultpage") 
        {
            $("#"+curclick.id).css("border-radius",this.value+'px');
        }
    })

    $('#border-color-input').change(function(){
        if(curclick.id != "resultpage") 
        {
            $("#"+curclick.id).css("border-color",this.value);
        }
    })

    $('#border-width-input').change(function(){
        if(curclick.id != "resultpage") 
        {
            $("#"+curclick.id).css("border-width",this.value+"px");
        }
    })

    $('#background-color-input').change(function(){
        if(curclick.id != "resultpage") 
        {
            $("#"+curclick.id).css("background-color",this.value);
        }
    })

    $('#webpage-background-color-input').change(function(){
        $(".window"+String(curwindow)).css("background-color",this.value);
    })

    $("#element-background-opacity").change(function(){
        if(curclick.id != "resultpage")
        {
            $("#"+curclick.id).css("opacity",this.value/100);
        }
        
    })

    $('#user-css-apply').click(function(){
        if(curclick.id != "resultpage")
        {
            $("#"+curclick.id).css(document.querySelector('#user-css-attributename').value,document.querySelector('#user-css-attributevalue').value);
        }
    })

    $('#z-index-up').click(function(){
        if(curclick.id === "resultpage")
        {
            toastr.error('Select Element');
        }
        if(curclick.id != "resultpage")
        {
            if(curclick.tagName === "IMG")
            {
                var pz = window.getComputedStyle(document.getElementById(document.getElementById(curclick.id).parentElement.id), null).getPropertyValue('z-index');
                pz = Number(pz);
                pz += 1;
                $("#"+document.getElementById(curclick.id).parentElement.id).css('z-index',pz);
            }
            var z = window.getComputedStyle(document.getElementById(curclick.id), null).getPropertyValue('z-index');
            z = Number(z);
            z += 1;
            $("#"+curclick.id).css('z-index',z);
        }
    })

    $('#z-index-down').click(function(){
        if(curclick.id === "resultpage")
        {
            toastr.error('Select Element');
        }
        if(curclick.id != "resultpage")
        {
            var z = window.getComputedStyle(document.getElementById(curclick.id), null).getPropertyValue('z-index');
            z = Number(z);
            z = Math.max(0,z-1);
            $('#'+curclick.id).css('z-index',z);
        }
    })
    
///////////////////////// CSS control ////////////////////////
    function reset_css(obj){
        var w = $(obj).width();
        var h = $(obj).height();
        var z = window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('z-index');
        var t = window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('top');
        var l = window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('left');
        var font_family = window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('font-family');
        var font_size = window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('font-size');
        $(obj).removeAttr("style");
        $(obj).css('font-family',font_family);
        $(obj).css('font-size',font_size);
        $(obj).width(w);
        $(obj).height(h);
        $(obj).css('left',l);
        $(obj).css('top',t);
        $(obj).css('position','absolute');
        $(obj).css('z-index',z);
    }

    function textarea_css0(obj){
        reset_css(obj);
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function textarea_css1(obj){
        reset_css(obj);
        $(obj).css("border-radius","5px");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function textarea_css2(obj){
        reset_css(obj);
        $(obj).css("border-radius","10px");
        $(obj).css("box-shadow","1px 1px 1px #999");
        $(obj).css("background-color","#adf4ff");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function textarea_css3(obj){
        reset_css(obj);
        $(obj).css("border-radius","5px");
        $(obj).css("box-shadow","1px 1px 1px #999");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function btn_css0(obj){
        reset_css(obj);
        $(obj).css("border-radius","5px");
        $(obj).css("background-color","#42f595");
        $(obj).css('resize','both');
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function btn_css1(obj){
        reset_css(obj);
        $(obj).css("text-shadow","0px -2px rgba(0,0,0,0.5)");
        $(obj).css("background-color","skyblue");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function div_css0(obj){
        reset_css(obj);
        $(obj).css("background-color","#89fad1");
        $(obj).css("border-radius","5px");
        $(obj).css("border","1px solid");
        $(obj).click(function(){
            curcss = this.className;
        })
    }
    function div_css1(obj){
        reset_css(obj);
        $(obj).css("background-color","#ffd9fe");
        $(obj).css("box-shadow","1px 2px #888888");
        $(obj).css("border","1px solid");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function div_css2(obj){
        reset_css(obj);
        $(obj).css("background-color","white");
        $(obj).css("box-shadow","5px 10px #888888");
        $(obj).css("border","1px solid");
        $(obj).click(function(){
            curcss = this.className;
        })
    }

    function div_css3(obj){
        reset_css(obj);
        $(obj).css("background-color","white");
        $(obj).css("border","3px double");
        $(obj).css("border-color","grey");
        $(obj).click(function(){
            curcss = this.className;
        })
    }
    
    textarea_css0('.textarea_css1');
    $('.textarea_css0').css("resize",'none');
    $('.textarea_css0').width('100px');
    $('.textarea_css0').height('30px');
    $('.textarea_css0').css('position','relative');

    textarea_css1('.textarea_css1');
    $('.textarea_css1').css("resize",'none');
    $('.textarea_css1').width('100px');
    $('.textarea_css1').height('30px');
    $('.textarea_css1').css('position','relative');

    textarea_css2('.textarea_css2');
    $('.textarea_css2').css("resize",'none');
    $('.textarea_css2').width('100px');
    $('.textarea_css2').height('30px');
    $('.textarea_css2').css('position','relative');

    textarea_css3('.textarea_css3');
    $('.textarea_css3').css("resize",'none');
    $('.textarea_css3').width('100px');
    $('.textarea_css3').height('30px');
    $('.textarea_css3').css('position','relative');

    btn_css0('.btn_css0');
    $('.btn_css0').width('100px');
    $('.btn_css0').height('30px');
    $('.btn_css0').css('position','relative');

    btn_css1('.btn_css1');
    $('.btn_css1').width('100px');
    $('.btn_css1').height('30px');
    $('.btn_css1').css('position','relative');

    div_css0('.div_css0');
    $('.div_css0').width('100px');
    $('.div_css0').height('30px');
    $('.div_css0').css('margin','5px');
    $('.div_css0').css('position','relative');

    div_css1('.div_css1');
    $('.div_css1').width('100px');
    $('.div_css1').height('30px');
    $('.div_css1').css('margin','5px');
    $('.div_css1').css('position','relative');

    div_css2('.div_css2');
    $('.div_css2').width('100px');
    $('.div_css2').height('30px');
    $('.div_css2').css('margin','5px');
    $('.div_css2').css('position','relative');

    div_css3('.div_css3');
    $('.div_css3').width('100px');
    $('.div_css3').height('30px');
    $('.div_css3').css('margin','5px');
    $('.div_css3').css('position','relative');

    $("#function-modal-open").click(function(){
        if(curclick.id == "resultpage")
        {
            toastr.error("Select Element");
        }
        if(curclick.id == "")
        {
            toastr.error("Set Element Name");
        }
        else
        {
            const modal = document.querySelector('.function-modal');
            modal.style.display = 'block';
        }
    })
    $(".function-modal_close").click(function(){
        const modal = document.querySelector('.function-modal');
        modal.style.display = 'none';
        //$('body').style.overflow = 'auto';
    })
    $(".function_select").click(function(){
        const modal = document.querySelector('.function-modal');
        modal.style.display = 'none';
        var func = document.getElementById('window-function-select').value;
        var event_name = document.getElementById('function-select').value;
        if(curclick.tagName === "BUTTON" && event_name == 'click'){
            /*if(data.indexOf("//func"+curclick.id) != -1){
            
            }*/
            if(func == "url"){
                var url = document.getElementById('link-url').value;
                var data = $('#resultpage').html();
                //console.log(data.indexOf('//addjs'));
                data = data.replace('//addjs',"\ndocument.getElementById('"+curclick.id+"').addEventListener('"+event_name+"',function(){\nwindow.open('"+url+"','popup');\n//func"+curclick.id+"\n});"+"//addjs")
                //console.log(data);
                $('#resultpage').html(data);
            // document.getElementById(curclick.id).addEventListener(event_name,function(){window.open(url,'popup');})
            }
            else{
                var data = $('#resultpage').html();
                data = data.replace('//addjs',"\ndocument.getElementById('"+curclick.id+"').addEventListener('"+event_name+"',function(){\nchangewindow('."+func+"');\n//func"+curclick.id+"\n});"+"//addjs")
                $('#resultpage').html(data);
            }
        }
        else{
            toastr.error("Uncorrect Element");
        }
    })

    $("#css-modal-open").click(function(){
        if(curclick.id == "resultpage")
        {
            toastr.error("Select Element");
        }
        if(curclick.id == "")
        {
            toastr.error("Set Element Name");
        }
        else
        {
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';

            const btnmodal = document.getElementsByClassName('btn-css');
            const textareamodal = document.getElementsByClassName('textarea-css');

            var curtag = $('#'+curclick.id).prop('tagName');
            if(curtag === 'BUTTON')
            {
                $('.btn-css').css('display','block');
                $('.textarea-css').css('display','none');
                $('.div-css').css('display','none');
                //btnmodal.style.display = 'block';
                //textareamodal.style.display = 'none';
            }
            if(curtag === 'TEXTAREA')
            {
                $('.btn-css').css('display','none');
                $('.textarea-css').css('display','block');
                $('.div-css').css('display','none');
                //btnmodal.style.display = 'none';
                //textareamodal.style.display = 'block';
            }
            if(curtag === 'DIV')
            {
                $('.textarea-css').css('display','none');
                $('.btn-css').css('display','none');
                $('.div-css').css('display','block');
            }
            //$('body').style.overflow = 'hidden';
        }
    })
    $(".modal_close").click(function(){
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        //$('body').style.overflow = 'auto';
    })
    $(".css_select").click(function(){
        if(curcss === 'textarea_css0'){textarea_css0("#"+curclick.id);}
        if(curcss === 'textarea_css1'){textarea_css1("#"+curclick.id);}
        if(curcss === 'textarea_css2'){textarea_css2("#"+curclick.id);}
        if(curcss === 'textarea_css3'){textarea_css3("#"+curclick.id);}
        if(curcss === 'btn_css0'){btn_css0("#"+curclick.id);}
        if(curcss === 'btn_css1'){btn_css1("#"+curclick.id);}
        if(curcss === 'div_css0'){div_css0("#"+curclick.id);}
        if(curcss === 'div_css1'){div_css1("#"+curclick.id);}
        if(curcss === 'div_css2'){div_css2("#"+curclick.id);}
        if(curcss === 'div_css3'){div_css3("#"+curclick.id);}
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        //$('body').style.overflow = 'auto';
    })

//////////////////// Element Control ///////////////////////
    function resize_percent(obj){
        if(document.querySelector(obj).tagName === "IMG")
        {
            obj = "."+document.querySelector(obj).parentElement.className;
        }
        var pw = document.querySelector(".window"+curwindow).offsetWidth;//window.getComputedStyle(document.querySelector(".window"+curwindow), null).getPropertyValue('width').replace('px','');
        var ph = window.getComputedStyle(document.querySelector(".window"+curwindow), null).getPropertyValue('height').replace('px','');
        var rw = $(".resultpage").prop("clientWidth");//window.getComputedStyle(document.querySelector(".resultpage"), null).getPropertyValue('width').replace('px','');
        var rh = $(".resultpage").prop("clientHeight");//window.getComputedStyle(document.querySelector(".resultpage"), null).getPropertyValue('height').replace('px','');
        var flag = false;
        console.log("pw,ph,rw,rh:",pw,ph,rw,rh);
        pw = Number(pw);
        ph = Number(ph);
        
        var cw = document.querySelector(obj).style.width;//window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('width');
        var ch = document.querySelector(obj).style.height;//window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('height');
        if(cw.indexOf('px') != -1){
            cw = Number(cw.replace('px',''));
            ch = Number(ch.replace('px',''));
            flag = true;
            var w_percent = (cw/rw)*100;
            var h_percent = (ch/rh)*100;
            document.querySelector(obj).style.width = String(w_percent)+"%";
            document.querySelector(obj).style.height = String(h_percent)+"%";
            //$(obj).css('width',w_percent);
            //$(obj).css('height',h_percent);
        }
        else{
            var w_percent = Number(cw.replace('%',""));
            var h_percent = Number(ch.replace("%",""));
        }
        var ct = document.querySelector(obj).style.top;//window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('top');
        var cl = document.querySelector(obj).style.left;//window.getComputedStyle(document.querySelector(obj), null).getPropertyValue('left');
        console.log("ct,cl : ",ct,cl);
        if(ct.indexOf('px') != -1){
            flag = true;
            console.log(ct,cl);
            ct = Number(ct.replace('px',''));
            cl = Number(cl.replace('px',''));

            var t_percent = (ct/rh)*100;
            var l_percent = (cl/rw)*100;

            document.querySelector(obj).style.top = String(t_percent)+"%";
            document.querySelector(obj).style.left = String(l_percent)+"%";
            //$(obj).css("top",t_percent);
            //$(obj).css('left',l_percent);
            console.log(t_percent,l_percent);  
        } 
        else{
            var t_percent = Number(ct.replace('%',""));
            var l_percent = Number(cl.replace("%",""));
        }
        //if(flag === false){
            var win_w_percent = document.querySelector(".window"+curwindow).style.width.replace("%","");
            var win_h_percent = document.querySelector(".window"+curwindow).style.height.replace("%","");//(win_h/rh)*100;
            console.log("기존 퍼센트 : ",win_w_percent , win_h_percent);
            var final_w = Math.max(Math.max(win_w_percent,w_percent+l_percent),100);
            var final_h = Math.max(Math.max(win_h_percent,h_percent+t_percent),100);
            console.log("바뀐 퍼센트 : ",final_w ,final_h);
            document.querySelector(".window"+curwindow).style.width = String(final_w)+"%";
            document.querySelector(".window"+curwindow).style.height = String(final_h)+"%";
        //}
       
        /*if(final_w > win_w_percent)
        {
            var ratio_w = final_w/win_w_percent;
            w_percent = w_percent*ratio_w;
            document.querySelector(obj).style.width = String(w_percent)+"%";
        }
        if(final_h > win_h_percent)
        {
            var ratio_h = final_h/win_h_percent;
            h_percent = h_percent*ratio_h;
            document.querySelector(obj).style.height = String(h_percent)+"%";
        }*/
        
        //$(".window"+curwindow).css('width',final_w);
        //$(".window"+curwindow).css('height',final_h);
        console.log("window :"+$(".window"+curwindow).css('width'),$(".window"+curwindow).css('height'));
    }

    function addbtn() {
        var btn = document.createElement('button')
        var btntext = document.createTextNode('btntext')
        //btn.appendChild(btntext);
        btn.style.position = "absolute";
        btn.style.width = "50px";
        btn.style.height = "10px";
        btn.id = 'btn'+String(num);
        btn.className += "resizable";
        document.querySelector(".window"+String(curwindow)).appendChild(btn);
        dragElement(document.getElementById('btn'+String(num)));
        $('#btn'+String(num)).css('z-index',num);
        num += 1;
    }

    function addtextbox(){
        var textbox = document.createElement('div');
        textbox.style.height = "50px";
        textbox.style.width = "50px";
        textbox.style.position = "absolute";
        textbox.id = 'text'+String(num);
        textbox.className += "resizable";
        document.querySelector(".window"+String(curwindow)).appendChild(textbox);
        dragElement(document.getElementById('text'+String(num)));
        document.getElementById('text'+String(num)).addEventListener('resize',resize_percent('#text'+String(num)));
        $('#text'+String(num)).css('opacity',1);
        $('#text'+String(num)).css('background-color',"white");
        $('#text'+String(num)).css('z-index',num);
        $('#text'+String(num)).css('border','1px solid');
        $('#text'+String(num)).css('resize','both');
        $('#text'+String(num)).css('overflow','auto');
        $('#text'+String(num)).attr('contenteditable','true');
        num+=1;
    }

    function addimg() {
        if (link == 'False') {
            toastr.error("Write picture link");
        } else {
            var container = document.createElement('div');
            container.style.height = "50px";
            container.style.width = "50px";
            container.style.position = "absolute";
            container.className += "resizable";
            container.id = 'img'+String(num);
            var img = document.createElement('img');
            img.src = link;
            img.id = 'img_'+String(num);
            img.style.width='100%';
            img.style.height='100%';
            document.querySelector(".window" + String(curwindow)).appendChild(container);
            container.appendChild(img);
            dragElement(document.getElementById('img'+String(num)));
            $('#img_'+String(num)).css('z-index',num);
            $('#img'+String(num)).css('z-index',num);
            num += 1;
        }

    }
    $('#link-input').change(function(event) {
        link = this.value
    })

    $('#add-img').click(function() {
        addimg();
    })

    $('.resultpage').mouseup(function(){
        //resize_percent('#'+curclick.id);
    })
    
    $('#add-textbox').click(function(){
        addtextbox();
    })

    $('#add-btn').click(function() {
        addbtn();
    })

    $('#delete-element').click(function(){
        if(curclick.tagName == "IMG"){
            $('#'+document.getElementById(curclick.id).parentElement.id).remove();
        }
        if(curclick.id == "resultpage" || curclick.id == "")
        {
            toastr.error("Select Element");
        }
        else{
            $('#'+curclick.id).remove();
        }
    })

    //dragElement(document.getElementById("testelement"));
    //dragElement(document.getElementById("catimg"));

    $('#position-edit').click(function(){
        if(editmode === 'True')
        {
            editmode = 'False';
            $('#position-edit').css("background-color","white");
        }
        else{
            editmode = 'True';
            $('#position-edit').css("background-color","skyblue");
        }
    });

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        // 이동 목적지
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            if(editmode === 'True'){
                e = e || window.event;
                e.preventDefault();
                // 시작지점 마우스좌표 얻기
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // 이동지점 마우스좌표 얻기
                document.onmousemove = elementDrag;
            }
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // 이동지점 커서좌표 계산
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // 요소의 새 위치 설정
            elmnt.style.top = Math.max(0,(elmnt.offsetTop - pos2)) + "px";
            elmnt.style.left = Math.max((elmnt.offsetLeft - pos1),0) + "px";
        }

        function closeDragElement(e) {
            /* 마우스버튼 풀렸을 때, 이동 멈춤 */
            document.onmouseup = null;
            document.onmousemove = null;
            $('#'+elmnt.id).unbind('onmousedown');
            resize_percent('#'+elmnt.id);
        } 
    } 
/////////////////// Add function ////////////////////////////

}