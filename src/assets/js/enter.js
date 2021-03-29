function noenter()
{
  return !(window.event && window.event.keyCode == 13);
}

// onkeypress="return noenter()"
