---
title: LeetCode-189.轮转数组
date: 2024/03/21
tags:
 - LeetCode
 - C++
categories:
 - 笔记
---

# 189.轮转数组

## 题目描述

给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

 

**示例 1:**

```cpp
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```cpp
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

 

**提示：**

- `1 <= nums.length <= 105`
- `-231 <= nums[i] <= 231 - 1`
- `0 <= k <= 105`

 

**进阶：**

- 尽可能想出更多的解决方案，至少有 **三种** 不同的方法可以解决这个问题。
- 你可以使用空间复杂度为 `O(1)` 的 **原地** 算法解决这个问题吗？



## 解题

### 方法一

因为是轮转，所以很明显只需要考虑`0 < k < nums.size()`的取值范围就行了，`k = k % nums.size()`即可得到。根据输入示例，如给定输入`nums = [1,2,3,4,5,6,7], k = 3`，输出应为`[5,6,7,1,2,3,4]`，仔细一看，这不就是...先把`nums`整体逆序得到`[7,6,5,4,3,2,1]`，然后将前段`7,6,5`和后段`4,3,2,1`分别逆序吗，那直接`reverse`启动！秒了。

#### 代码：

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        k = k % nums.size();
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```

### 方法二

使用额外的数组来保存轮转后的数组，还是只需要考虑`0 < k < nums.size()`的取值范围就行了

#### 代码：

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int len = nums.size();
        vector<int> resolved(len);
        for (int i = 0; i < len; i++) {
            resolved[(i + k) % len] = nums[i];
        }
        nums = resolved; // 因为题目要轮转原数组
    }
};
```

### 方法三

上面使用了额外空间，那如果不使用额外空间呢，那就要想办法在原来的数组上完成上面的步骤，通过上面的代码可以发现，每个元素轮转后的下标就是`(i + k) % len`，那么这样不就好了，一个个接力转，还是给定输入`nums = [1,2,3,4,5,6,7], k = 3`，那么`1`转到`4`，`4`转到`7`，`7`转到`3`...直到每个元素都转了一下，就完成了。

> 修正：有时候这样子不一定每个元素都能遍历到，比如输入`nums = [-1,-100,3,99], k = 2`时，那么应该再做处理，每当遍历又回到起点时，就把起点再往后挪一个，并对遍历元素数进行计数，这样就能保证每个元素都转到了。

#### 代码：

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int len = nums.size();
        int count = 0;
        for (int i = 0; i < len && count < len; i++) { // 起点每次往后挪1位，直到count计数到所有元素都遍历过了
        	int index = i; // 从起点开始转
        	int current_value = nums[i]; // 从起点开始转
            do {
                int next = (index + k) % len; // 下次该从这里转了
                swap(current_value, nums[next]); // 把当前的元素current_value转到next位置去，并把原来next位置上的元素保存到current_value下次转
                index = next;
                count++;
            } while (index != i); // 当index == i时表示又转回起点了，那么此时如果遍历完了就结束，否则把起点+1再继续遍历
        }
    }
};
```

