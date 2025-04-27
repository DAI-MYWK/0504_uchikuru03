$(function(){
  $(language.click).on('click', function(){
    document.cookie = language.name[language.target] + '=1; path=/; max-age=' + language.maxAge
  })
})
