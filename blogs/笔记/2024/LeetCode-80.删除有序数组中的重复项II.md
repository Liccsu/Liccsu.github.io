---
title: LeetCode-80.删除有序数组中的重复项II
date: 2024/03/20
hideComments: false
tags:
 - LeetCode
 - 原地去重
 - 快慢指针
categories:
 - 笔记
---

# 80.删除有序数组中的重复项II

## 题目描述

给你一个有序数组 `nums` ，请你**[ 原地](http://baike.baidu.com/item/原地算法)** 删除重复出现的元素，使得出现次数超过两次的元素**只出现两次** ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组** 并在使用 O(1) 额外空间的条件下完成。



**说明：**

为什么返回数值是整数，但输出的答案是数组呢？

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```cpp
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

 

**示例 1：**

```cpp
输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
```

**示例 2：**

```cpp
输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应返回新长度 length = 7, 并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
```

 

**提示：**

- `1 <= nums.length <= 3 * 104`
- `-104 <= nums[i] <= 104`
- `nums` 已按升序排列



## 解题

首先想到可以先记录每个元素出现的次数，然后怎么删除重复的元素呢，假如定义另一个数组用来存放去重之后的数组`res`，思路是遍历原数组，当此元素记录次数小于`3`时就存到数组`res`中去，如果已记录次数大于等于`3`就跳过这个元素，这样遍历完之后`res`数组中就是每个元素出现次数不超过两次的数组了，现在题目要求“原地”去重，那么改一下，`res`数组不要了，直接把记录次数小于`3`的元素放到原数组中对应的位置，当遍历结束之后，最后一次的下标就是结果数组的长度。

### 代码：

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int len = nums.size();
        if (len < 3) {
            return len; // 特殊情况，当给出的数组长度小于3时必然满足条件，直接返回
        }
        unordered_map<int, int> umap; // 记录每个元素出现的次数
        int index = 0; // 已处理的元素在结果数组中的下标
        for (int i = 0; i < nums.size(); i++) {
            umap[nums[i]]++; // 此元素出现次数记录+1
            if (umap[nums[i]] <= 2) { // 只有重复不超过2次的元素才能留下来，超过的部分就跳过
                nums[index++] = nums[i];
            }
        }
        return index;
    }
};
```

此题有一个条件，数组是有序的，这意味着相同的元素在数组中下标必然是连续的，就用不着记录每个元素出现的次数了，假如定义一个慢指针`slow`，作用与上面的`index`一样，定义一个快指针，作用与上面的`i`一样，然后呢要求最多重复两次，那么只需判断`nums[slow-2]`和`nums[fast]`是否相等即可，如果相等，那么就是`nums[slow-2] == nums[slow-1] == nums[fast]`，已经重复超过两次了。和上面一样的，最后的`slow`就是结果数组的长度。

### 代码：

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int len = nums.size();
        if (len < 3) {
            return len; // 特殊情况，当给出的数组长度小于3时必然满足条件，直接返回
        }
        int slow = 2, fast = 2; // 前2个数是必然会被保留的
        for (; fast < len; fast++) {
            if (nums[slow - 2] != nums[fast]) { // 只有重复不超过2次的元素才能留下来，超过的部分就跳过
                nums[slow++] = nums[fast]; 
            }
        }
        return slow;
    }
};
```

如果把上面的`for`循环换成简洁的C++风格，那么就是这样：

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int index = 0; // 和上面的slow，index是一样的
        for (auto num : nums) {
            if (index < 2 || nums[index - 2] != num) { // 只有重复不超过2次的元素才能留下来，超过的部分就跳过
                nums[index++] = num; 
            }
        }
        return index;
    }
};
```

最后拓展一下，按照上面的思路，那么如果是要求重复不超过`k`次，那么就应该是这样：

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums, int k) {
        int index = 0; // 和上面的slow，index是一样的
        for (auto num : nums) {
            if (index < k || nums[index - k] != num) { // 只有重复不超过k次的元素才能留下来，超过的部分就跳过
                nums[index++] = num; 
            }
        }
        return index;
    }
};
```

