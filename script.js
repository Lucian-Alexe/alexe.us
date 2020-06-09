fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40lucian_alexe')
   .then((res) => res.json())
   .then((data) => {
      // Filter for acctual posts. Comments don't have categories, therefore can filter for items with categories bigger than 0
      const res = data.items //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

      // Functions to create a short text out of whole blog's content
      function toText(node) {
         let tag = document.createElement('div')
         tag.innerHTML = node
         node = tag.innerText
         return node
      }

      // Put things in right spots of markup
      let output = '';
      posts.forEach((item) => {
         output += `
         <li class="article">
            <a href="${item.link}"><h3>${item.title}</h3><a/>
         </li>`

      })
      document.querySelector('.medium-posts').innerHTML = output
})
