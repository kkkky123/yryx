/**
 * Created by ykz on 2014/8/25.
 */
var jic = {
    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */

    compress: function(source_img_obj, quality, output_format){

        var mime_type = "image/jpeg";
        if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
        }


        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }
};
function handleFileSelect (evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                var i = document.getElementById("test");
                i.src = event.target.result;
                $(i).css('width',$(i).width()/10+'px');
                var quality =  50;
                i.src = jic.compress(i,quality).src;
                i.style.display = "block";
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}