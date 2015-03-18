var timer;
var currentUnreadMessageCount = 0;
var currentReminderCount = 0;
var documentTitle = document.title;
var documentHead = document.head || document.getElementsByTagName("head")[0];
var EMAIL_ICON_64 = "iVBORw0KGgoAAAANSUhEUgAAAjMAAAGhCAYAAACUFDUXAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAF49JREFUeNrs3f1V3MYawGGtT/4P7gBXYKgAqCBQgaECQwVABUAF4ArAFbCuAFIBpALTwUYvXvlgBzv7MTOSVs9zji527jXxldfa345mRqOqZZPJZL3+sjE9tqb/eLsCIKWn+rivj8f6+Kc+xvHz0Wj05NTQd6MW4mWt/rI7DZeIlnV/DACtuZ+Gzac6bO6dDsTM7yMmAubDNGQA6J7H+ripj4s6bB6dDsRM9X0U5nAaMetON0BvjKdRc+NUMMiYeRExH+tjzWkG6K3H+jgSNQwqZuqQ2a+/nIkYgJUynkaNeTWsbsxMVyVdVlYiAayy8/o4tQqKlYuZOmTiltJxZTQGYAge62PPKA0rETPTuTExGmOFEsDwxG2nc6eB3sZMHTIb05DZcBoBButqGjVuO9GvmJmGzG3lthIA3zbe2xE0tOXNAiGzL2QAeOH5A+506gEUN9fIzDRkLp02AF5hhIZux4xbSwAIGrpopttMQgaAGcX7xbXTQKdi5sXyayEDwCy26/cOUxLoTsxUll8DML/96TxLyO63c2amO/ueOU0ALCDmzWyORqNHp4JWYsY8GQASuK9jZtNpIKff3Wby5GsAlrUxHeWHbF4dmbGfDAAJxe2md5Zrk8ubV0ImRmPMkwEgFe8rlI2Z2mHl9hIAacXqpnWngewxMx2V+ei0AJDBsVNA9pipjMoAkI/RGYrEzAenBICMjP6T3PfVTHUt71aepwFAXk+j0eit00BKL0dmjMoAkNuaxxyQJWamE393nQ4ACvjLKSB5zAgZAArynkOWmNlyKgAoZTpPE5LGzLZTAUBBPkSTLmama/7XnQoACvIhmnQxUx8bTgMAhXnvQcwA0G+TyWTbWSBVzLhvCUAbPD6HZDEDAG1wZ4BkMbPtNADQgj+dAlLFDAC0wcgMYgYAQMwAAGIGAEDMAACIGQBAzAAAiBkAADEDACBmAAAxAwAgZgAAxAwAgJgBAMQMAICYAQAQMwCAmAEAEDMAAGIGAEDMAABiBgBAzAAAiBkAADEDAIgZAAAxAwAgZgAAxAwAIGYAAMQMAICYAQDEDACAmAEAEDMAAGIGABAzAABiBgBAzAAAiBkAQMwAAIgZAAAxAwAgZgAAMQMAIGYAAMQMACBmAADEDACAmAEAEDMAgJgBABAzAABiBgBAzAAAYgYAQMwAACT0R5d+M/f399XT05M/FYBMNjY2qrW1NScCMZMqXD5//lyNx2MRA9BC1Kyvr1dbW1vV7u7u84+htyYFPTw8TA4PDyf1p4JJ/KsdDofD0Y2jjpvJ2dnZ5OvXryXfFm69C9ObmLm7u5tsb2+7YDgcDkfHj/iweXJyUipqxAzdj5n4y7C/v+8C4XA4HD2MmhipETMMOmZub2/dTnI4HI6eHzGqnnGURsyQRJal2efn59XOzo5JvQA9F4s03r1797xQAwYTMwcHB9XR0ZEzC7Ai4oNpfEC9urpyMuimlOOF5sc4HA7Hah+Xl5duM7G6IzMxGqPaAVZbXOvdcqJrRpHGy36TiJi4vQTA6osdhB8eHlLsJDwejUY7zijLWnpk5vHx0RwZgAGJOTR7e3tOBKsTMzEiY9USwLDEKqdYuQpdsNRtppubG3UOMFAJbje5zUQSS43MuL0EMFwxKn9xceFE0N+YiUm/MV8GgOGKW02mGtDbmPn06ZOzBzBwETK25aBtC82ZiRGZ2N46t/39/Wp9fd2fEsCCYqJuHDltbGxUd3d3C/32zJkhhT8W+UUx8beEqP0ImuPjY1EDMGfEnJ6eZg+ZEJvoxYdc12nastBtps+fPxf7DUbQxChQLAE3Rwfg/yMmnqMUR4mQKf0hF5LFTMm/IKIGoLsR0/jy5Ys/BPoTM20/k0PUAHQnYhqux/QqZrryghU1gIhpP2K68kEXMTOXv//+u1P/B0QNIGK6wX4z9CZmukrUACKmXUZnEDOiBuA/YpVQ1yMGxIyoAfjlNSwe5itiYKAxI2oA1ywQMy4QAK5RIGa6fMEwWQ0QMSBmen0B2dzcNKkOEDEgZubXpYeR9WG5IyBihnRdhl7EzOXlZXV7e1ttb2+LGkDEtGh/f796eHh4/gpiZk4RMhE0ogYQMe1FTHy4NCqDmBE1ACIGhhwzogYQMXmtra1Vh4eHIgYxI2pEDdC/iDk5OXmOmLOzMxGDmBE1ogb4UTwluusRc3x8/PxzEDOiRtQAP0TM6empiAExs3jUdGkJoaiBYUZMREP8XMSAmFkoamICW9f2RRA1IGJEDIiZucRENlEDiBgRA71/NlPXoyYugjFBEBAxIgbETC+jJiYGxgRBUQMiRsSAmBE1gIgBVj9mRA0gYkDMiBpRAyJGxICYETWiBkTM7NcnEQNiRtQAvYyY5nokYkDMiBqglxHTpesPiBlRI2qgY39/3r59K2JAzAw3aroy3CtqoP9/X0QMiJnWLjrxiU7UgIgRMSBmeikiJibkiRoQMSIGxIyoyXgRjzkBMcGxK3MCQMSIGBAzomYuETHx+4mLuqhBxIgYEDOIGhAxIgbEjKgRNSBiADEjakQNIkbEAGJG1IgaRIyIATGDqIHBRsz29nZ1e3srYkDMiBpRA/2MmDjix4CYETWiBn4wHo+rvb09EQOIGVEjauhfxOzs7DwfNzc3IgYQM32Omq9fvz5PKIyJhaKGIUVM/FjEAGJmRcSEwhipETWIGBEDiBlRkzFqYoJmTNQEEQOIGXoZNTFBU9QgYgAxQ6+jJogaRAwgZhA1iBgRA4gZUSNqEDEiBhAzokbUIGIAMYOoETUipht/F0QMiBlEjaihlxHTtdc+IGYQNXToz07EAGIGF3pR08uIaf6sRAwgZmj9wn99fd2peQSiph8R06U/GxEDiJmB293d7eQKD1EjYkQMIGaYS1eXrXb1loaIETGAmEHUzP3G2sXJpiJGxABiBlEzl64uAxYxIgYQM4gaUSNiRAwgZhA1iBgAMYOoETEiBhAziBpRI2Jmsba2Vp2cnIgYQMwgakRNfyPm+PhYxABiBlEjan709PRUnZ+fdz5i4ucAYgZRI2p+iJjT09PniDk6OhIxAGKGFFETEztFTbmIiWiIn4sYADFDoqiJiZ3xZiZqRAyAmKG3YoJn16Pm5uZGxIgYQMxAf6Nmb2/vOQ5i9Y+IETGAmIFeRk1MmI3VP12LGhEDIGYQNb2MGhEDIGYQNb2MGhEDIGYQNb2MGhEDIGYQNb2Mmq5GTPw5nJ2diRhAzICo+fX36WrENOf98PBQxABiBlY9at6+ffv8Nfaq+b8giV8TAdQsBe9qxHTpPAMs6w+ngK5FTdzyiBGNriyfjhiJ30vz+4nf52tPgr6/v+9MuPx8XuOcChhAzEALUXNxcfEcEV2KhBh96cpDHkUMgNtMdPzNuJmgGrdrzO2YLwbdTgLEDHREREyMMIgaEQMgZhA1IgZAzICoETEAYgZEjYgBEDMwrKgRMQBiBlEjYgDEDIiaUjY2NkQMgJhB1PQvara3t6vb29vq7u5OxACIGehP1DQRE0f8GAAxA72IGhEDIGZgqah57aGRIgZAzECvoiYm2pYIivh3xjyYmA8jYgDS8NRsqEVgxBFPw765uak+f/5cjcfjZAGzu7tbbW1tPX/1GAYAMcOCTk9Pq48fP3oz/Y245XR4ePh8hAiaL1++PEdOHPf399XT09Nvf30csaz6/fv3z1/jYDZXV1ff4w9AzPBdvPkeHR09v1HEqEPc3hA0s4nbQG4FlRGhGK/TeL3GbT/L0oFZmTMzgJDZ2dl5DpnmDePg4MCJoXMhE6/TZtQrXqMxkgggZgYubovEG0S8UbwUozOChi4Fd7wef759FyvNvE4BMTPwT7qbm5v/CZlGjNT45EsXQua14H75On05YgMgZgYiRl5meQOIT77N7SdoQ4y8/CpkGjEJW9AAYmZAIk729vZmvvDHm0mqJcgwb8hEeM/i/0YaATHDiojbRovMMYj48SZBSefn53OPCv5qDhiAmFmhT7lx22gRzbyFeLOA3CJiYgn2oq/VGKFxexQQMyvk56XXy3yfeW5PwSLilmaKFUrxPQQNIGZWKGRSzXlp9vqAHOL1FcGcSgSNpduAmOn5G0OOCZE21SNneKce+YvRmdf2qAHEDD0ImZxzXJaZ0wCvybm02l40gJjpmbhwx4hMzgt3PLfpw4cPTjbJ5H5wZO7AB8QMCUMm9y2geOJzPIjSk55J6fj4+PnhkbmDxl40IGbosBKTHSNg7u7uhAxZxFOwcz+xvZmbM+tmfICYoYDmIXy5l6HGbYDcbzSwvb1dJGhi1ZSl2yBm6EjIpNhDZpZPzNfX10KGIkqNAMaHAA9TBTFDi0pt3R67BueeywA/KzU3K17fthoAMUMLSk1kjIiJiZnQhhgJjBGaGBnMydJtEDMUFhMXc194400kPhXnfhOBWaM692sxdskWNCBmKCA+QeZ+PlITMjERE7oUNJZuA2Km52KioqXXDFmMzkTQ5JyIXmouGiBmBiciJiYq5g6ZGJGJiZfQ5aApsXQ7Rmgs3QYxQ6KLaqml1zEiY+k1fVAqvEvs3wSImUGETExMzB0yll7Tx6AptReNpdsgZlhAyaXXQoa+aiar535IZfPMMyudQMwwR8jkfrpvvAmUWO4KJYImdqe2Fw0gZjoiLpgxImMPGZhPxHnuSfIlPmgAYqb3IZP73nypLeKhDbFbtb1oADHTkhKTDO0hwxCUWrodIzSxGzcgZgYvLoolln/GBMncF3joiti9ukTQxG7clm6DmBl8yJTaQyYmSAoZhqTk0u3YnRsQM4NTasv0mBBp6TVDVWqOWPw9sxcNiJlBKbmHTEyIhCGLEckYobF0G8QMicSEwdwXPEuv4fW4z/13InbrFjQgZlZafHKLCYMlQiYmQAL/DRpLt0HMsKCYIGjpNbSveRZZzgnxpebEAWKmmIiY3DuTlnqKMKxK0JRYuh0jNJZug5jptZJLr2NExtJr6N4HgBL7SAFiJmvIxITA3CFj6TUsHjSl9qKxdBvETK+UXHotZGA5zaT52CU7p+bZa1Y6gZjpRcjkfqpuXHxLLDOFIQVN7JJtLxoQM4MXF6oYkbGHDPRTfEjIPVm/xAceQMwsHDK574mX2podhix2zbYXDYiZwSkxuc8eMlBOqaXbMUITu4IDYqY1cTEqsewyJibmvrACP4pdtEsETewKbuk2iJnWQqbUHjIxMVHIQHkll27HLuGAmCmm1FblMRHR0mtoV6m5avH33V40IGaKKLmHTExEBNoXI6MxQmPpNoiZ3ouJerkvNJZeQ3eV2N8pdg0XNCBmsn1iiol6JUImJh4C3Q0aS7dBzPROTMyz9BpoNM9Eyzkxv9TcPBAzAxARk3tH0FJP7wXSBk2JpdsxQmPpNoiZhS8ipZZex4iMpdfQP6U+iJTYzwrEzIqGTEzEyx0yll5D/4Om1F40lm6DmJlJyaXXQgZWQzN5P3brzql5BpyVTiBmfhsyuZ9mGxe9Ess7gfJBE7t124sGxExr4gIRIzL2kAGWER9Wci8aKPHBC8RMD0Mm973oUluiA+2L3bvtRQNippgSk+rsIQPDU2rpdozQxO7kwABjJi4CJZY7xoTA3Bc0oJtiN+8SQRO7k1u6DQOLmZJ7yMSEQCEDw1Vy6XbsVg4MJGZKiAmAll4DodScOROCYUAx0yyhzDViEhETEwABXl53YoQm12pGm3DCwGLm5SellEFj6TUwy4ed1NeIGPE5OztzcmFoMdNcAGKEJmXIxIQ/gP8LmlSjKM3zoczNg4HGTIj4WPaiYuk1MK/mttAyEZL7ljmImZ5dVBbdsbPUU3OB1bz2LDqq0owGu/aAmPkuJuzOex87/vcxIuNTEbCoRT8QxaiO0WAQM69eHGZ96q2VA0DKoJnnVvU81ypgYDEz66edlJP3AEJz2+j/IiVuiVsxCWJmpgvKa0O+8d/lWFYJ0FxjYkLvr64x8c/tYQViZq4Lysu5MPaQAUqJD00/L0pIsfISxMzAvNy7odRW5ACNGIFp4iXlnlgwVH8M9f94XEDiYhKfiKxYAkqLkeD4MBXXItcgEDMLs2IAaJNdxSENT80GAMQMAICYAQAQMwCAmAEAEDMAAGIGAEDMAABiBgBAzADQXU9PT04CYmYe9/f3zjxAh7guM6iY+fPPP5f+l3758sWZB+iIGJUZj8dLfx/PmqI3MRNPeF3Wzc1N9fj46OwDdMDFxYWTwLBiJh5Zn8LBwYGzD9Cy+GB5fn6+9PcxKkPvYmZtbW3pf3EMaQoagPbE7aW9vb0kk39TjNpDsZhJWeBXV1fJ/iIBMLuY8Lu5uZls4u/W1paTSr9i5q+//kr2G4j5M+/evatOT0/NpgfILK65MSoeIZNy7qLbTLRpNKnN+4tiJOXt27fOHgDV7u5udX19vcgvHY9Gox1nkGUtNDITc2b29/edPQCqDx8+OAm0aqGRmdDcbwVguGJRyMPDw6K/3MgMSSy8A3DMXHePFGDYjo+PnQRat/DITIjJYzF5F4DhiQ+1d3d3y3wLIzMksdSzmWJ48eTkxFkEGKDLy0sngf7HTIghRpslAQxLfJB17acrlrrN1IjbTTEZ2OZ3AKsv5kve3t6m+FZuM5HEmxTfJG43JXphA9BhMRqz4J4y0O2YaV7g7p8CrHbIxAfXFM/ng07GTIiN9KLYvdABhAz0MmZCbGsdL/i49QRA/zXXdSHDYGKmKfjYeyD+AgDQTxEvZ2dnRtzpvklmdc1P1tfXY8WUw+FwOHpy7O/vTx4eHrK/RXgXphcx07i8vBQ1DofD0YOIiQ+hhYgZkkiyz8w84gGVFxcX1Xg8ft6fBoB2xdSAePJ1TA0oPN/RPjP0M2Z+Dps4/vnnn+e4ASC/mP8SAfP+/fvnDfBanA8jZuh/zAAwaGKGJN44BQCAmAEAEDMAAGIGABAzAABiBgBAzAAAiBkAQMwAAIgZAAAxAwAgZgAAMQMAIGYAAMQMACBmAADEDACAmAEAEDMAgJgBABAzAABiBgBAzAAAYgYAQMwAAIgZAAAxAwCIGQAAMQMAIGYAADEDACBmAADEDACAmAEAxAwAgJgBABAzAABiBgAQMwAAYgYAQMwAAIgZAEDMAACIGQAAMQMAiBkAADEDACBmAADEDAAgZgAAxAwAgJgBABAzAICYAQAQMwAAYgYAQMwA0Konp4BUMePFBEAb/nYKSBUz904DANDnmHl0GgBowdgpIFXM/OM0ANACH6ZJFjPKGIDSnkajkZghWcyYMwNAad57SBczdRk/eVEBUNgXp4BkMTP9OnYqACjoxikglVH8x2Qy2ai/3DkdABTwOBqN3jkNpPI8MlO/qOI206PTAUABRmVIHzNeXAAU9MkpIKVR84PJZLJef3lwSgDIyC0mkvs+MjNd7z92SgDI6NQpIFvMTF04JQBkEluBmNJA3pgZjUbxInt0WgDI4GK6txkkNfr5H0wmk936y7VTA0BCETHvxAw5vPlP3XwbnRk7NQAkdCpkyGX02j+0iR4ACd3XIbPpNJDLm1cL59smeudODwAJHDkF5DT61X8xmUzWqm+jM+tOEwALOq8/IIsZ2omZadC43QTAomKUf8dcGXJ789vS+Xa7SVEDMK8ImAMhQ+sxMw2amDtz5VQBMIeD6QdiaD9mpmJ0xosSgJneM6bbfEARo1n/h9MJwbf1seG0AfALV3XIHDgNdDJmBA0AQobex4ygAUDI0DVv5v0F05npO5VHHgDwzZGQoU2jZX7xZDK5rL/sO40Ag9QsvzbZl1a9WeYXT0v8YPqCBmA4mg3xhAytG6X4JpPJZL3+cl2ZRwMwBLH/mKdg0xlvUnyT+gX9OH0iauxH48UNsJqa0ZgjIUOXjFJ/w+lqp7PKXBqAVRHhcjrdER5WP2ZeRM16/eVY1AD0OmIuqm9PvjYSw/Bi5qeo+TiNmjWnHKDzHuvjtD5uRAxi5r9hE0HzV33sOvUAnQuYWJn0yQMiETOzh00EzVZ9bFdWQQGUFiMuES1fqm8jMAIGMZMgbiJq1qZh86fAAUgaLn9Pfzyuj1iB+ui0sCr+FWAApWgQ6G544yQAAAAASUVORK5CYII=";
var bgColor, fontColor;

documentHead.appendChild(getOwaIcon());


self.port.on("startMonitor", function(delayBetweenChecks, faviconBgColor, faviconFontColor) {
    if (timer) {
        clearInterval(timer);
    }
    if (delayBetweenChecks < 1) {
        delayBetweenChecks = 1;
    }
    timer = setInterval(notify, delayBetweenChecks * 5000);
	bgColor = faviconBgColor;
	fontColor = faviconFontColor;
});

self.port.on("detach", function() {
    tearDown();
});

function tearDown(){
    clearInterval(timer);
    setFavicon(0);
}

function getOwaIcon(){
    var owaIcon = document.createElement("link");
    owaIcon.rel = "icon";
    owaIcon.type = "image/png";
    owaIcon.sizes = "100x100";
    owaIcon.href = "data:image/png;base64," + EMAIL_ICON_64;
    return owaIcon;
}

function drawRoundedRectangle(ctx, x, y, width, height, radius){
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.strokeStyle = bgColor;
    ctx.stroke();
    ctx.fillStyle = bgColor;
    ctx.fill();
}
function addTextToFavicon(ctx){
    var number = getPrettyNumber(getNewUnreadMessageCount());
    var digitsInNumber = getDigitCountOfNumber(number) ;
    var x = 40, y = 15;
    ctx.fontStyle = "bold";

    if (digitsInNumber == 1){
        ctx.font="50px Arial";
        x = 35;
        y = 10;
    } else if (digitsInNumber == 2){
        ctx.font="45px Arial";
        x = 37;
        y = 12;
    } else {
        ctx.font="40px Arial";
    }
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillStyle = fontColor;
    var numberString = (number >= 99) ? new String(number + "+") : new String(number);
    ctx.fillText(numberString, x, y);
}

function drawIcon(){
    var canvas; 
    var context; 
    canvas = document.createElement("canvas");
    canvas.width = 75;
    canvas.height = 75;

    context = canvas.getContext("2d");
    drawRoundedRectangle(context, 0, 0, 75, 70, 30);
    addTextToFavicon(context);
    return canvas.toDataURL("image/png");
}

function getDigitCountOfNumber(number){
    //It's ok to only check for 3 digits max because we filter this number with getPrettyNumber()
    if (number < 10){
        return 1;
    } else if (number >= 10 && number <=99){
        return 2;
    } else {
        return 3;
    }
}

function getPrettyNumber(number){
    var num = number;
    if (!number){
        num = 0;
    } else if (number > 99){
        num = 99;
    }
    return num;
}

function setFavicon() {
    var icon = drawIcon();
    var s = document.querySelectorAll("link[rel*='icon'][type='image/png']");

    if (s.length != 1 || s[0].href != icon) {
        for(var i = s.length-1; i >= 0; i--){
            s[i].remove();
        }
        var newIcon = getOwaIcon();
        if(currentUnreadMessageCount > 0){
            newIcon.href = icon;
        }
        documentHead.appendChild(newIcon);
    }
}

function getCountBasedOffFolders(folders){
    var count = 0;
    for (var folderIndex = folders.length-1 ; folderIndex >= 0; folderIndex--){
        var activeCounts = getItemsWithActiveCount(folders[folderIndex]);
        for (var activeCountIndex = activeCounts.length-1; activeCountIndex >= 0; activeCountIndex--){
            count += getCountFromHTML(activeCounts[activeCountIndex]);
        }
    }
    return count;
}

function getCountBasedOffSpans(spanContainer){
    var count = 0;
    for (var spanContainerIndex = spanContainer.length-1; spanContainerIndex >= 0 ; spanContainerIndex--){
        count += getCountFromHTML(spanContainer[spanContainerIndex]);
    }
    return count;
}

function getCountFromHTML(container){
    return (container.innerHTML.indexOf("Unread") > 0) ? parseInt(container.innerHTML.match(/\d/gi).join(""), 10) : 0;
}

function getFolders (){
    return document.querySelectorAll("[aria-label='Folder Pane']");
}

function getItemsWithActiveCount(folder){
    return folder.querySelectorAll("[id*='.ucount']");
}

function getContainersBySpanId(){
    //Selecting an based off id will return 1 item (or should)
    var containers = document.querySelectorAll('#spnCV');
    var spans = [];
    for(var containerIndex = containers.length-1; containerIndex >= 0; containerIndex--) {
        var folderName = containers[containerIndex].parentNode.parentNode.querySelector('#spnFldrNm').getAttribute("fldrnm");
        // Can be used to check for other folder names also
        if(folderName == "Unread Mail") {
            spans.push(containers[containerIndex]);
        }
    }
    return spans;
}

function getNewReminderCount(){
    //OWA check
    var reminderCount;
    var containers = document.querySelectorAll('[aria-label="New Notification"]');
    if (containers.length > 2){
        reminderCount = parseInt(containers[3].title.match(/\d/gi).join(""));
    } else {
        //365 check
        containers = document.getElementsByClassName('o365cs-notifications-notificationCounter');
        if (containers[0]){
            reminderCount = parseInt(containers[0].innerHTML.match(/\d/gi).join(""));
        }
    }
    return (reminderCount);
}

function haveNewReminders(){
    return ( getNewReminderCount() > currentReminderCount );
}

function haveNewMessages(){
    return ( getNewUnreadMessageCount() > currentUnreadMessageCount);
}

function getNewUnreadMessageCount() {
    var newUnreadMessageCount = 0;
    var folders = getFolders();
    if (folders.length > 0) {
        newUnreadMessageCount = getCountBasedOffFolders(folders);
    } else {
        newUnreadMessageCount = getCountBasedOffSpans(getContainersBySpanId());
    }
    return newUnreadMessageCount;
}

function generateEmailMessage(){
    var count = getNewUnreadMessageCount();
    return "You have " + count + " new" + ((count > 1) ? " messages" : " message") + ".";
}

function generateReminderMessage(){
    var reminderCount = getNewReminderCount();
    return "You have " + reminderCount + " new" + ((reminderCount > 1) ? " reminders" : " reminder") + ".";
}

function notify() {
    var newUnreadEmailCount = getNewUnreadMessageCount();
    var newReminderCount = getNewReminderCount();
    
    if (haveNewMessages()) {
        self.port.emit("notify", generateEmailMessage(), true);
    }
    if (haveNewReminders()){
        self.port.emit("notify", generateReminderMessage(), false);
    }
    
    currentUnreadMessageCount = newUnreadEmailCount;
    currentReminderCount = newReminderCount;
    setFavicon(); 
}