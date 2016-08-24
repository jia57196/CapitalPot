

from datetime import datetime
datetime.strptime("2012-may-31 19:00", "%Y-%b-%d %H:%M")

import matplotlib.pyplot as plt
import datetime
import numpy as np

x = np.array([datetime.datetime(2013, 9, 28, i, 0) for i in range(24)])
y = np.random.randint(100, size=x.shape)

my_dpi = 100

plt.figure(figsize=(800/my_dpi, 600/my_dpi), dpi=my_dpi)
plt.plot(x,y)
#plt.savefig(datetime.strftime("%Y-%m-%d_%H:%M:%S.%f"))
plt.savefig('output.png', dpi=my_dpi)
plt.show()

