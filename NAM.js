
function HighLightCode ( Code, Line )
{
  var Area = document.getElementById ("ParsedCode");
  var Alpha, Betha, Arrow, Dummy;
  Dummy = "<table width=146 cellspacing=0>";
  for ( i = 0; i < Code.length; ++i )
  {
    var Rule = Code[i];
    var pos = Rule.indexOf ( "->." )
    if ( pos < 0 ) pos = Rule.indexOf ( "->" );
    if ( 0 <= pos )
    {
      Alpha = Rule.substr ( 0, pos );
      Arrow = Rule.substr ( pos, 3 );
      if ( Arrow == "->." ) Arrow = "&#8614;"; 
	  else Arrow = "&#8594";
      Betha = Arrow == "&#8614;" ? Rule.substr ( pos + 3, Rule.length - pos - 2 ) :  Rule.substr ( pos + 2, Rule.length - pos - 2 );
    }
    Dummy += "<tr valign=top";
    if ( i == Line ) Dummy += " bgcolor=#e0f0e0";
    Dummy += "><td align=right width=25>" + (i + 1 ) + ".&nbsp;</td><td align=right>" + Alpha + "</td><td align=center style=\"font-face:times new roman,serif;\">" + Arrow + "</td><td align=left>" + Betha + "&nbsp;&nbsp;</td></tr>";
  }
  Dummy += "</table>";
  Area.innerHTML = Dummy;
}

function RunOnce ()
{
  var RulesMaxQty = 50;
  var Res = false;
  var Executed = 0;
  var Code = document.getElementById("CodeArea").value.split(/\n/);
  var Word = document.getElementById("Word").value;
  var Rules = new Array ();
  var TerminalRule;
  var pos;
  var alpha, betha;
  var c;

  R = 0;
  for ( i = 0; i < Code.length && i < RulesMaxQty; ++i )
  {
    var tmp = Code[i];
    var Rule = "";
    for ( j = 0; j < tmp.length ; ++j )
    {
      c = tmp.substr(j,1);
      if ( c != " " && c != "\t" ) Rule += c;
    }
    if ( 0 < Rule.length )
    {
  
       if ( Rule.indexOf ( "->" ) < 0 && Rule.indexOf ( "->." ) < 0 )
         document.getElementById ("ErrorMsg").innerHTML += ( i + 1 ) + ": пропущен знак правила.\n";
       else
       {
         Rules[R] = Rule;
         ++R;
       }
    }
    //else
    //  document.getElementById ("ErrorMsg").innerHTML += ( i + 1 ) + ": пуста€ строка.\n";
  }
  i = 0;
  TotalRules = R <= 62 ? R : 62;
  TerminalRule = false;
  while ( Executed == 0 && i < TotalRules && !TerminalRule )
  {
    TerminalRule = false;
    Rule = Rules[i];
    if ( 0 <= ( pos = Rule.indexOf ( "->." ) ) )
    {
      alpha = Rule.substr ( 0, pos );
      betha = 
	  Rule.substr ( pos + 3, Rule.length - pos - 3 );
      if ( 0 <= Word.indexOf (alpha) )
      {
        document.getElementById ("Word").value = Word.replace ( alpha, betha );
		TerminalRule = true;
        Executed = i + 1;
      }
    }
    else if ( 0 <= ( pos = Rule.indexOf ( "->" ) ) )
    {
      alpha = Rule.substr ( 0, pos );
      betha = Rule.substr ( pos + 2, Rule.length - pos - 2 );
      if ( 0 <= Word.indexOf (alpha) )
      {
        document.getElementById ("Word").value = Word.replace ( alpha, betha );
        Executed = i + 1;
      }
    }
    if ( Executed ) HighLightCode ( Rules, i );
    ++i;
  }
  return ( Executed != 0 && !TerminalRule ) ? Executed : 0;
}
function Run ()
{
  var MaxExecution   = document.getElementById("exnum").value == "" ? 500 : document.getElementById("exnum").value;
  var ExecutionCount = 0;
  var Applicable     = true;

  document.getElementById ("ErrorMsg").innerHTML = "";
  while ( RunOnce () && ExecutionCount < MaxExecution ) { ++ExecutionCount; }
  if ( ExecutionCount == MaxExecution )
    document.getElementById ("ErrorMsg").innerHTML += "ѕревышено врем€ выполнени€.\n";
  else
    document.getElementById ("ErrorMsg").innerHTML += "¬ыполнение завершено.\n";
}
function Step ()
{
  var ErrorMSg = document.getElementById ("ErrorMsg");
  if ( r = RunOnce() ) ErrorMSg.innerHTML += "ѕравило " + r + " применено.\n";
  else ErrorMSg.innerHTML = "Ќи одно правило не применено, либо выполнено терминальное правило.\n";
}

