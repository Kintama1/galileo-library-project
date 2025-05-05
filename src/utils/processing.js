export function processTitle(title) {
    if (title.length > 10 && !title.includes(" ")){
        return title.slice(0, 10) + "..."; 
    }
    else if (title.length > 28) {
        return title.slice(0, 28) + "..."; // Added ellipsis for clarity
    }
    else if (title.length < 3) {
        return `Title Unknown`;
    }
    else {
        return title; // Return the original title if it's not too long or empty
    }
}

export function processDimensions(format){
    var height;
    var spineWidth;

    switch (format){
        case "2":
            height = '320px';
            spineWidth = '90px'
        break;
        case "4":
            height = '300px';
            spineWidth = '70px'
        break;
        case "8":
            height = '280px';
            spineWidth = '70px'
        break;
        case "12":
            height = '260px';
            spineWidth = '60px'
        break;
        case "16":
            height = '245px';
            spineWidth = '50px'
        break;
        case "32":
            height = '230px';
            spineWidth = '45px'
        break;
        default:
            height = '250px';
            spineWidth = '55px'
        break;
    }
    return {height,spineWidth}

}