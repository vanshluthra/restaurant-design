function Slider_Controller() {
    
    
    // ===========
    // Properties
    // ===========
    
    this.segmentContainer = document.getElementById("segment-container");
    this.circles = document.getElementsByClassName("circle-segment");
    this.next = document.getElementById("right-arrow");
    this.prev = document.getElementById("left-arrow");
    
    this.currentSegmentOnScreen = 0;
    this.animationDelayInSeconds = 6;
    this.timeoutID = 0;
    
    // ===========
    // Methods
    // ===========
    
    // This will force the slider to slide forward.  It's called when the next button is clicked.
    this.slideForward = function() {
        clearTimeout(this.timeoutID);
        this.addNextAnimationClass("forward");
        this.adjustCurrentSegmentOnScreen(1);
    }
    
    // This will force the slider to slide backward.  It's called when the prev button is clicked.
    this.slideBackward = function() {
        clearTimeout(this.timeoutID);
        this.adjustCurrentSegmentOnScreen(-1);
        this.addNextAnimationClass("reverse");
    }
    
    // This will remove all classes currently attached to the segment controller.  Then it adds the next animation class to the segment container based of the currentSegmentOnScreen poperty.
    this.addNextAnimationClass = function(direction) {
        this.segmentContainer.className = "";
        this.segmentContainer.classList.add(`slide-${this.currentSegmentOnScreen}-${direction}`);
    }
    
    // This method is called when you want to adjust the currentSegmentOnScreen property.
    this.adjustCurrentSegmentOnScreen = function(amount) {
        this.currentSegmentOnScreen += amount;    
        if (this.currentSegmentOnScreen > 2) this.currentSegmentOnScreen = 0;
        if (this.currentSegmentOnScreen < 0) this.currentSegmentOnScreen = 2;
    }
    
    // This will add the appropriate animation class to the segment container in x amount of seconds.  
    // Based off of the animationDelayInSeconds property.
    this.playAnimationsAutomatically = function() {
        this.timeoutID = setTimeout(function(){
            this.addNextAnimationClass("forward");
            this.adjustCurrentSegmentOnScreen(1);
        }.bind(this), this.animationDelayInSeconds * 1000);
    }
    
    // This is called whenever an animation is finished.  It will update the circles at the bottom and make only one highlighted to indicate which segment is currently being viewed.
    this.makeCurrentCircleActive = function() {
        for(let i = 0; i < this.circles.length; i++) {    
            this.circles[i].classList.remove("active-circle-segment")
            if(i == this.currentSegmentOnScreen) {
                this.circles[i].classList.add("active-circle-segment");
            }
        }
    }
    
    
    
    // ================
    // Event Listeners
    // ================
    
    // Add event listeners for the left and right buttons.
    this.next.addEventListener("click", function(){
        this.slideForward();
    }.bind(this));
    
    // Add event listeners for the left and right buttons.
    this.prev.addEventListener("click", function(){
        this.slideBackward();
    }.bind(this));
    
    // When an animation ends, this is called.  It sets up the animation to continue animating without any user input.
    this.segmentContainer.addEventListener("animationend", function(){
        this.playAnimationsAutomatically();
        this.makeCurrentCircleActive();
    }.bind(this));
    
}



var slider_controller = new Slider_Controller();
slider_controller.playAnimationsAutomatically();

