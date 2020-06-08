 $(function () {
            var mediumPromise = new Promise(function (resolve) {
            var $content = $('#jsonContent');
            var data = {
                rss: 'https://medium.com/feed/@lucian_alexe'
            };
            $.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40lucian_alexe', data, function (response) {
                if (response.status == 'ok') {
                    var output = '';
                    $.each(response.items, function (k, item) {
                        output += `<div class="card mb-3 mx-auto mr-5 " style="width: 20rem;">`;
                        var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                        var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                        var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                        var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                        var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                        output += `<img src="${src}" class="card-img-top" alt="Cover image">`;
                        output += `<div class="card-body">`;
                        output += `<h5 class="card-title"><a href="${item.link}">${item.title}</a></h5>`;
                        var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                        yourString = yourString.replace('h4', 'p');
                        yourString = yourString.replace('h3', 'p');
                        var maxLength = 120; // maximum number of characters to extract
                        //trim the string to the maximum length
                        var trimmedString = yourString.substr(0, maxLength);
                        //re-trim if we are in the middle of a word
                        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                        output += `<p class="card-text">${trimmedString}...</p>`;
                        output += `<a href="${item.link}" class="btn btn-outline-success">Read More</a>`;
                        output += '</div></div>';
                        return k < 10;
                    });
                    resolve($content.html(output));
                }
            });
            });




