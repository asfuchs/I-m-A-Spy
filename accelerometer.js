var isShaking = false;
var shakingTime = 0;

if(window.DeviceMotionEvent != undefined)
{
  var lastTime = new Date().getTime();
  var threshold = 3.0;
  var lastAx = 0, lastAy = 0, lastAz = 0;
  var notShakingCount = 0;

  window.ondevicemotion = function(e)
  {
    var ax, ay, az;
    ax = event.accelerationIncludingGravity.x;
    ay = event.accelerationIncludingGravity.y;
    az = event.accelerationIncludingGravity.z;
    
    var deltaX = Math.abs(ax - lastAx);
    var deltaY = Math.abs(ay - lastAy);
    var deltaZ = Math.abs(az - lastAz);
    
    isShaking = ((deltaX > threshold && deltaY > threshold)
              || (deltaX > threshold && deltaZ > threshold)
              || (deltaY > threshold && deltaZ > threshold));
    
    if(isShaking)
    {
      notShakingCount = 0;
    }
    else
    {
      ++notShakingCount;
    }
    
    var now = new Date().getTime();
    var timeDiffSecs = (now - lastTime) / 1000;
    lastTime = now;
    
    if(notShakingCount > 5)
    {
      shakingTime = 0;
    }
    else
    {
      shakingTime += timeDiffSecs;
    }
    
    lastAx = ax;
    lastAy = ay;
    lastAz = az;
  }
}