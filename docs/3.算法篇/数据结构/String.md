---
title : String
---

### 🔹 字符串基本操作

| 方法                                      | 说明                                |
| ----------------------------------------- | ----------------------------------- |
| `length()`                                | 返回字符串长度                      |
| `charAt(int index)`                       | 获取指定位置字符                    |
| `substring(int beginIndex)`               | 从索引开始截取到末尾                |
| `substring(int beginIndex, int endIndex)` | 截取指定区间的子串（左闭右开）      |
| `indexOf(String str)`                     | 查找子串首次出现位置，没找到返回 -1 |
| `lastIndexOf(String str)`                 | 查找子串最后一次出现的位置          |
| `contains(CharSequence s)`                | 判断是否包含某子串                  |
| `equals(String another)`                  | 字符串内容是否相等                  |
| `equalsIgnoreCase(String another)`        | 忽略大小写判断是否相等              |
| `startsWith(String prefix)`               | 是否以某前缀开头                    |
| `endsWith(String suffix)`                 | 是否以某后缀结尾                    |

------

### 🔹 修改/构造字符串

| 方法                                           | 说明                          |
| ---------------------------------------------- | ----------------------------- |
| `concat(String str)`                           | 拼接字符串（也可以用 `+`）    |
| `replace(char oldChar, char newChar)`          | 替换字符                      |
| `replaceAll(String regex, String replacement)` | 使用正则替换所有匹配          |
| `toLowerCase()` / `toUpperCase()`              | 转小写 / 大写                 |
| `trim()`                                       | 去掉首尾空白字符              |
| `split(String regex)`                          | 按正则切割成字符串数组        |
| `toCharArray()`                                | 转为字符数组（适合排序/遍历） |

------

### 🔹 StringBuilder/StringBuffer（可变字符串）

| 方法                         | 说明             |
| ---------------------------- | ---------------- |
| `append(...)`                | 添加内容         |
| `insert(int offset, ...)`    | 插入             |
| `delete(int start, int end)` | 删除子串         |
| `reverse()`                  | 反转字符串       |
| `toString()`                 | 转回不可变字符串 |

