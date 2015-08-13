Play the Market
===============

###What does it do?
- Pull stock data from Quandl (https://quandl.com)
- Parse CSV with PaPaParse (https://github.com/mholt/PapaParse)
- Build dataset of daily close values and perform basic line-leveling
- Generate Web Audio API WaveShaperNode from dataset (https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)
- Bind to Qwerty Handcock keyboard (http://stuartmemo.com/qwerty-hancock/)


###Next steps/Issues to resolve
- Right now the distortion produces inharmonic partials (iterative sinusoidal regression against line-leveled stock data as alternative)
- Expose stock/date interval selection in UI
- Quandl imposes a limit of 50 requests/day for unauthorized users.

