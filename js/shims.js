//Find min value in array
function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};

//Find max value in array
function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};


//Find linear regression of array (assumes evenly-spaced y vals for purpose of project)
function linearRegression(array){
  var lr = {};
  var n = array.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;
  
  for (var i = 0; i < array.length-1; i++) {
  
    sum_x += i;
    sum_y += array[i];
    sum_xy += (i*array[i]);
    sum_xx += (i*i);
    sum_yy += (array[i]*array[i]);
  } 
  
  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
  lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
  
  return lr;
}

//Array line-levelling
function levelArray(array) {
  var lr = linearRegression(array);
  var leveledArray = [];
  array.forEach(function(el,i){
    leveledArray.push( (array[i] - ((i*lr.slope) + lr.intercept)) );
  });
  return leveledArray;
}