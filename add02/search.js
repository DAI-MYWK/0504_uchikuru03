$(function(){
  $('.p-searchSort_item').on('click', function(){
    if (!$(this).hasClass('is-active')) {
      $('.p-searchSort_item').removeClass('is-active')

      $(this).addClass('is-active')
      $('#order').val($(this).data('sort'))

      $('.p-searchForm').submit()
    }
  })

  $('.p-searchShowing_item').on('click', function(){
    if (!$(this).hasClass('is-active')) {
      $('.p-searchShowing_item').removeClass('is-active')

      $(this).addClass('is-active')
      $('#number').val($(this).data('number'))

      $('.p-searchForm').submit()
    }
  })
})
