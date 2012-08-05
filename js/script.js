function init(){
    var iconObjects = [],
        iconEventHandlers = {};

    (function getData(){
        $.post('/src/icons.php', function (data){
            for(var i = data.length;i--;){
                iconObjects[i] = new Icons(data[i]);
            }
        });
        $.post('/src/user.php', function(data) {
            Icons.prototype.userVIP = data;
        });

    }());

    function Icons(data){
        var scope = this;
        this.icon = data;
        this.element  = $("<li>").append($("<a>", {
            "class": this.icon["css_class"],
            "href" : "#"
        }).click(iconClick));

        function iconClick(){
            scope.iconClickHandler();
            return false;
        }

        if(this.icon["vip"]){
            this.element.append($("<span>", {
                "class": "icoTest vip-icon"
            }));
        }

        this.iconWrapper.prepend(this.element);
    }


    Icons.prototype.iconWrapper = $(".icons");
    Icons.prototype.secondsToTime = function(secs)
    {
        var minutes = Math.floor(secs / 60),
            modMinutes = secs % 60,
            seconds = Math.ceil(modMinutes),
            iconTime = {
                m: minutes,
                s: (seconds.toString().length - 1)? seconds : "0" + seconds
            };
        return iconTime.m + ":" + iconTime.s;
    }

    Icons.prototype.iconTimer = function(){
        var scope = this,
            seconds = this.icon["rest_time"] || this.icon["recovery_time"],
            timer = this.element.append($("<span>",{
            "class" : "timer",
            "text" : this.secondsToTime(seconds)
        })).children(".timer"),
            timerId = setInterval(function(){
            if (seconds-=1) {
                timer.html(scope.secondsToTime(seconds));
            }
            else{
                clearInterval(timerId);
                scope.iconUnlock();
            }
        },1000);
    }

    Icons.prototype.iconLock = function(){
        this.element.children("a").addClass("iconLock");
        this.iconTimer();
    }

    Icons.prototype.iconUnlock = function(){
        this.element.children("a").removeClass("iconLock").siblings(".timer").remove();
    }

    Icons.prototype.iconClickHandler = function(){
        if (!this.element.hasClass("iconLock")){
            if(this.userVIP || !this.icon["vip"]) {
                this.iconLock();
                iconEventHandlers[this.icon["title"]]();
            }
            else{
                alert("Only for VIP!");
            }
        }
    }

    iconEventHandlers["Test 1"] = function(){
        console.log("Test 1");
    }
    iconEventHandlers["Test 2"] = function(){
        console.log("Test 2");
    }
    iconEventHandlers["Test 3"] = function(){
        console.log("Test 3");
    }
    iconEventHandlers["Test 4"] = function(){
        console.log("Test 4");
    }
}

$(document).ready(init);