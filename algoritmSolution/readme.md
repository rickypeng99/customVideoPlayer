## Algorithm question's solution and explanation:

The code is in the `solution.java` file at the root, I used java to do this algorithm problem  
The solution is (for the sample quest board is):  

Link can earn 5970 rupees in maximum in a month

The algorithm that I use is a `O((31)^2*n) = O(n)` algorithm, for n denotes the number of quests, I view the number of days, which is 31, as a constant here, if not, then the algorithm should be `O(n^2k)` for n denotes the number of days annd k denotes number of quests.

I used dynamic programming approach, for which I used a 1d array to store the imtermidiate result. `memo[i]` denotes that on ith day, what is the current maximum rupees earned. For every `memo[i]`, it equals to the max value between `momo[i - 1]` and the maximum sum of `rupees[j]` + the max value of all `memo[a]` where `a <= startDate[j]` where `endDate[j] == i`. In short, Link either earns nothing on a day since there isn't any quest ended, or he can possibly earn more from the quest ended on that day, which will be added to the max value from the rupees he earned before the starting date of that quest

After the traversal, I return the `memo[31]`, for it denoting the max rupees that Link can earn in 31 days. 