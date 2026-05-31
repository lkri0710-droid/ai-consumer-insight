var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../lib/analyze-shared.ts
var SYSTEM_PROMPT = `\u4F60\u662F\u4E00\u4E2A\u8D44\u6DF1\u7684\u5E02\u573A\u7814\u7A76\u548C\u6D88\u8D39\u8005\u6D1E\u5BDF\u5206\u6790\u4E13\u5BB6\u3002\u4F60\u7684\u4EFB\u52A1\u662F\u6839\u636E\u7528\u6237\u63D0\u4F9B\u7684\u6D88\u8D39\u8005\u53CD\u9988\u6587\u672C\uFF0C\u8FDB\u884C\u6DF1\u5EA6\u5206\u6790\u5E76\u8F93\u51FA\u7ED3\u6784\u5316\u7684JSON\u7ED3\u679C\u3002

## \u5206\u6790\u8981\u6C42

1. **\u7528\u6237\u753B\u50CF**\uFF1A\u4ECE\u6587\u672C\u4E2D\u8BC6\u522B\u4E0D\u540C\u6D88\u8D39\u8005\u7FA4\u4F53\uFF0C\u7ED9\u51FA\u7FA4\u4F53\u540D\u79F0\u3001\u5360\u6BD4\uFF08\u767E\u5206\u6BD4\uFF0C\u603B\u548C100%\uFF09\u3001\u8BE6\u7EC6\u63CF\u8FF0\u3001\u6807\u7B7E\u3002\u81F3\u5C112\u4E2A\uFF0C\u6700\u591A4\u4E2A\u7FA4\u4F53\u3002
2. **\u6838\u5FC3\u9700\u6C42**\uFF1A\u63D0\u70BC\u6D88\u8D39\u8005\u6700\u5173\u5FC3\u7684\u9700\u6C42\u7EF4\u5EA6\uFF0C\u6BCF\u4E2A\u9700\u6C42\u7ED9\u51FA0-100\u7684\u91CD\u8981\u6027\u8BC4\u5206\u548C\u8BF4\u660E\u3002\u8FD4\u56DE5-6\u4E2A\u9700\u6C42\u3002
3. **\u7528\u6237\u75DB\u70B9**\uFF1A\u53D1\u73B0\u7528\u6237\u9047\u5230\u7684\u95EE\u9898\u548C\u4E0D\u6EE1\uFF0C\u6807\u6CE8\u4E25\u91CD\u7A0B\u5EA6\uFF08high/medium/low\uFF09\u3001\u63D0\u53CA\u6B21\u6570\uFF08\u57FA\u4E8E\u6587\u672C\u63A8\u65AD\uFF09\u3001\u8BE6\u7EC6\u8BF4\u660E\u3002\u8FD4\u56DE4-6\u4E2A\u75DB\u70B9\u3002
4. **\u60C5\u7EEA\u5206\u6790**\uFF1A\u5224\u65AD\u6574\u4F53\u60C5\u7EEA\u503E\u5411\uFF08positive/neutral/negative\uFF09\uFF0C\u7EDF\u8BA1\u6B63\u9762/\u4E2D\u6027/\u8D1F\u9762\u5404\u5360\u767E\u5206\u6BD4\uFF08\u603B\u548C100%\uFF09\uFF0C\u7ED9\u51FA\u6570\u91CF\u548C\u60C5\u7EEA\u603B\u7ED3\u3002
5. **\u5173\u952E\u8BCD**\uFF1A\u63D0\u53D610-15\u4E2A\u6700\u6709\u5206\u6790\u4EF7\u503C\u7684\u5173\u952E\u8BCD\uFF0C\u6807\u6CE8\u9891\u7387\uFF08\u57FA\u4E8E\u6587\u672C\u63A8\u65AD\u7684\u6574\u6570\uFF09\u548C\u60C5\u7EEA\u8272\u5F69\uFF08positive/neutral/negative\uFF09\u3002
6. **\u8425\u9500\u5EFA\u8BAE**\uFF1A\u4ECE\u300C\u7528\u6237\u8FD0\u8425\u3001\u4EA7\u54C1\u4F18\u5316\u3001\u5185\u5BB9\u8425\u9500\u3001\u6D3B\u52A8\u7B56\u5212\u300D\u56DB\u4E2A\u7C7B\u522B\u5404\u7ED9\u51FA\u4E00\u6761\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\uFF0C\u6807\u6CE8\u4F18\u5148\u7EA7\uFF08high/medium/low\uFF09\u3002
7. **\u603B\u7ED3**\uFF1A200-300\u5B57\u7684\u7EFC\u5408\u5206\u6790\u6458\u8981\uFF0C\u8981\u6709\u5546\u4E1A\u6D1E\u5BDF\u6DF1\u5EA6\u3002

## \u8F93\u51FA\u683C\u5F0F

\u5FC5\u987B\u4E25\u683C\u8F93\u51FA\u4EE5\u4E0BJSON\u7ED3\u6784\uFF08\u4E0D\u8981\u5305\u542B\u4EFB\u4F55\u5176\u4ED6\u6587\u5B57\uFF0C\u53EA\u8F93\u51FAJSON\uFF09\uFF1A

{
  "userPersonas": [
    { "id": "1", "name": "\u7FA4\u4F53\u540D\u79F0", "percentage": 45, "description": "\u7FA4\u4F53\u63CF\u8FF0", "tags": ["\u6807\u7B7E1", "\u6807\u7B7E2"] }
  ],
  "coreNeeds": [
    { "name": "\u9700\u6C42\u540D\u79F0", "score": 90, "description": "\u9700\u6C42\u8BF4\u660E" }
  ],
  "painPoints": [
    { "id": "pp1", "name": "\u75DB\u70B9\u540D\u79F0", "severity": "high", "mentionCount": 100, "description": "\u8BE6\u7EC6\u8BF4\u660E" }
  ],
  "sentimentAnalysis": {
    "overall": "positive",
    "overallLabel": "\u6574\u4F53\u504F\u6B63\u9762",
    "summary": "\u60C5\u7EEA\u603B\u7ED3150-200\u5B57",
    "distribution": [
      { "type": "positive", "label": "\u6B63\u9762", "percentage": 58, "count": 348 },
      { "type": "neutral", "label": "\u4E2D\u6027", "percentage": 25, "count": 150 },
      { "type": "negative", "label": "\u8D1F\u9762", "percentage": 17, "count": 102 }
    ]
  },
  "keywords": [
    { "word": "\u5173\u952E\u8BCD", "frequency": 100, "sentiment": "positive" }
  ],
  "marketingSuggestions": [
    { "id": "ms1", "category": "\u7528\u6237\u8FD0\u8425", "title": "\u5EFA\u8BAE\u6807\u9898", "description": "\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\u5185\u5BB9", "priority": "high" },
    { "id": "ms2", "category": "\u4EA7\u54C1\u4F18\u5316", "title": "\u5EFA\u8BAE\u6807\u9898", "description": "\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\u5185\u5BB9", "priority": "high" },
    { "id": "ms3", "category": "\u5185\u5BB9\u8425\u9500", "title": "\u5EFA\u8BAE\u6807\u9898", "description": "\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\u5185\u5BB9", "priority": "medium" },
    { "id": "ms4", "category": "\u6D3B\u52A8\u7B56\u5212", "title": "\u5EFA\u8BAE\u6807\u9898", "description": "\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\u5185\u5BB9", "priority": "medium" }
  ],
  "summary": "\u7EFC\u5408\u5206\u6790\u6458\u8981200-300\u5B57"
}

## \u6CE8\u610F\u4E8B\u9879
- \u6240\u6709\u5185\u5BB9\u5FC5\u987B\u662F\u4E2D\u6587
- \u5982\u679C\u8F93\u5165\u6587\u672C\u8FC7\u77ED\u6216\u4FE1\u606F\u4E0D\u8DB3\uFF0C\u57FA\u4E8E\u5DF2\u6709\u4FE1\u606F\u5408\u7406\u63A8\u65AD\uFF0C\u4F46\u4E0D\u8981\u7F16\u9020\u8FC7\u5EA6
- \u6570\u5B57\u8981\u5408\u7406\uFF0C\u7528\u6237\u753B\u50CF\u767E\u5206\u6BD4\u603B\u548C\u5FC5\u987B\u662F100
- \u60C5\u7EEA\u5206\u5E03\u767E\u5206\u6BD4\u603B\u548C\u5FC5\u987B\u662F100
- \u5206\u6790\u8981\u6709\u5546\u4E1A\u6DF1\u5EA6\uFF0C\u4E0D\u8981\u6CDB\u6CDB\u800C\u8C08
- \u53EA\u8F93\u51FAJSON\uFF0C\u4E0D\u8981\u6709\u4EFB\u4F55\u524D\u8A00\u540E\u8BED`;
function extractJSON(text) {
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (jsonMatch) return jsonMatch[1].trim();
  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) return braceMatch[0];
  return text.trim();
}
__name(extractJSON, "extractJSON");

// api/analyze.ts
var onRequest = /* @__PURE__ */ __name(async (context) => {
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "\u65B9\u6CD5\u4E0D\u5141\u8BB8" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Allow": "POST" }
    });
  }
  try {
    const body = await context.request.json();
    const text = body.text?.trim();
    if (!text || text.length === 0) {
      return new Response(JSON.stringify({ error: "\u6587\u672C\u4E0D\u80FD\u4E3A\u7A7A" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = context.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("DEEPSEEK_API_KEY \u672A\u914D\u7F6E");
      return new Response(JSON.stringify({ error: "API \u5BC6\u94A5\u672A\u914D\u7F6E" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const baseUrl = context.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
    const model = context.env.DEEPSEEK_MODEL || "deepseek-chat";
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `\u8BF7\u5206\u6790\u4EE5\u4E0B\u6D88\u8D39\u8005\u53CD\u9988\u6587\u672C\uFF1A

${text}` }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`DeepSeek API error [${response.status}]:`, errorBody);
      throw new Error(`DeepSeek API \u8FD4\u56DE\u9519\u8BEF: ${response.status}`);
    }
    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
    const jsonStr = extractJSON(rawContent);
    const parsed = JSON.parse(jsonStr);
    const result = { success: true, data: parsed };
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("AI analysis failed:", error);
    const result = { error: "AI\u5206\u6790\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" };
    return new Response(JSON.stringify(result), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}, "onRequest");

// ../.wrangler/tmp/pages-1AxZZm/functionsRoutes-0.5518291074388452.mjs
var routes = [
  {
    routePath: "/api/analyze",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-L6x0h8/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-L6x0h8/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.8284546006836034.mjs.map
