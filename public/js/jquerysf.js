jQuerySF = typeof jQuerySF !== 'undefined' ? jQuerySF : {};
jQuerySF.SpeakerFilter = function(filterId, talksId) {

    console.log("Initializing with filters: #" + filterId + ", and talks: #" + talksId);

    var filterContainer = document.getElementById(filterId);
    this.items = filterContainer.getElementsByTagName("li");

    var talkContainer = document.getElementById(talksId);
    this.talks = talkContainer.getElementsByTagName("li");

    this.selectedItem = null;
    this.selectedValue = null;

    var ref = this;

    function getItemForValue(value) {

        for(var i = 0; i < ref.items.length; i++) {
            var item = ref.items[i];
            var v = item.innerHTML;

            if(v.toUpperCase() === value.toUpperCase()) {
                return item;
            }
        }

        return null;
    };

    function selectFilter(selectedItem) {

        //nothing to do if already selected
        if(selectedItem.classList.contains('selected')) {
            return;
        }

        //remove the selected flag from the previously selected item
        if(ref.selectedItem) {
            ref.selectedItem.classList.remove('selected');
        }

        //finally, add the selected flag to our newly selected item
        selectedItem.classList.add('selected');

        ref.selectedItem = selectedItem;
        ref.selectedValue = selectedItem.innerHTML;
    };

    function reset() {

        for(var i = 0; i < ref.talks.length; i++) {
            var item = ref.talks[i];
            item.style.display = "block"
        }
    };

    function showFilteredTalks() {

        for(var i = 0; i < ref.talks.length; i++) {

            var item = ref.talks[i];
            var adjustedValue = ref.selectedValue.replace(/\s/gi, "-").toLowerCase();

            if(item.classList.contains(adjustedValue)) {
                item.style.display = "block"
            }
            else {
                item.style.display = "none"
            }
        }
    };

    function onItemClick(e) {

        var value = e.target.innerHTML;

        //select our filter item
        selectFilter(e.target);

        //if 'all speakers' selected, reset everything
        if("ALL SPEAKERS" === value.toUpperCase()) {
            reset();
            return;
        }

        //otherwise show the talks
        showFilteredTalks();
    };

    /**
     * Initialize the filter with the specified value
     * @param selectedValue The string value of the filter.
     */
    this.init = function(selectedValue) {

        //wire up click handlers to each item
        for(var i = 0; i < ref.items.length; i++) {
            var item = ref.items[i];
            item.addEventListener('click', onItemClick);
        }

        //default value if not set
        selectedValue = selectedValue || "all speakers";

        //select the initial item
        var selectedItem = getItemForValue(selectedValue);
        selectFilter(selectedItem);
    };
};

jQuerySF.CountdownTimer = function(timerId) {

    var counterContainer = document.getElementById(timerId);

    this.days = counterContainer.getElementsByClassName("days")[0];
    this.hours = counterContainer.getElementsByClassName("hours")[0];
    this.minutes = counterContainer.getElementsByClassName("minutes")[0];
    this.seconds = counterContainer.getElementsByClassName("seconds")[0];

    this.date = new Date();

    var ref = this;

    var MILLS_IN_SECOND = 1000;
    var MILLS_IN_MINUTE = 60 * MILLS_IN_SECOND;
    var MILLS_IN_HOUR = 60 * MILLS_IN_MINUTE;
    var MILLS_IN_DAY = 24 * MILLS_IN_HOUR;

    function update() {

        var now = new Date();
        var d = ref.date.getTime() - now.getTime();

        var days = Math.floor(d / MILLS_IN_DAY);

        d -= days * MILLS_IN_DAY;

        if(days <= 0) {
            days = "00";
        }
        else if(days < 10) {
            days = "0" + days;
        }

        var hours = Math.floor(d / MILLS_IN_HOUR);

        d -= hours * MILLS_IN_HOUR;

        if(hours <= 0) {
            hours = "00";
        }
        else if(hours < 10) {
            hours = "0" + hours;
        }

        var minutes = Math.floor(d / MILLS_IN_MINUTE);

        d -= minutes * MILLS_IN_MINUTE;

        if(minutes <= 0) {
            minutes = "00";
        }
        else if(minutes < 10) {
            minutes = "0" + minutes;
        }

        var seconds = Math.floor(d / MILLS_IN_SECOND);
        if(seconds <= 0) {
            seconds = "00";
        }
        else if(seconds < 10) {
            seconds = "0" + seconds;
        }

        //ref.weeks.innerHTML = weeks;
        ref.days.innerHTML = days;
        ref.hours.innerHTML = hours;
        ref.minutes.innerHTML = minutes;
        ref.seconds.innerHTML = seconds;
    };

    /**
     * Start the countdown timer using the specified date
     * @param date A future date to count down from.
     */
    this.start = function(date) {

        ref.date = date;

        console.log("Starting countdown from date: " + date);

        ref.stop();

        //update 3 times per sec, to mostly avoid skips
        setInterval(update, 333);
        update();
    };

    /**
     * Stop the current countdown timer.
     */
    this.stop = function() {

        if(ref.interval) {
            clearInterval(ref.interval);
        }
    };
};