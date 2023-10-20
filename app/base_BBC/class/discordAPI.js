/* eslint-disable max-len */

require('dotenv').config();

class DiscordSDK {
  authtype;

  authtoken;

  apibase;

  constructor() {
    this.apibase = false;
    this.authtoken = false;
    this.authtype = false;
  }

  SetAccessInfo(authtype, authtoken) {
    this.authtype = authtype;
    this.authtoken = authtoken;
    this.apibase = 'https://discord.com/api';
  }

  /**
 *
 * @param {*} method
 * @param {*} apipath
 * @param {*} postvars
 * @returns
 */
  async Api(method, apipath, postvars = false) {
    const url = this.apibase + apipath;
    const headers = {
      authorization: `${this.authtype} ${this.authtoken}`,
      'content-type': 'application/json',
    };
    const sendBody = {
      method,
      headers,
    };
    if (postvars) {
      sendBody.body = JSON.stringify(postvars);
    }
    try {
      const res = await fetch(url, sendBody);
      if (res.status === 204 || res.status === 203) return { statusText: res.statusText };
      if (res.ok) return await res.json();
      throw new Error(`Response status ${res.status}: ${await res.text()}`);
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}
module.exports = DiscordSDK;

// class DiscordSDK
// {
//     public function RunAPI($method, $apipath, $postvars = array(), $options = array(), $expected = 200, $decodebody = true)
//     {
//         if ($this->authtype === false || $this->authtoken === false)  return array("success" => false, "error" => self::Discord_Translate("Authentication token or type not set."), "errorcode" => "missing_auth_type_or_token");
//         if ($this->apibase === false)  return array("success" => false, "error" => self::Discord_Translate("API base not set."), "errorcode" => "missing_apibase");

//         $options2 = array(
//             "method" => $method,
//             "headers" => array(
//                 "Authorization" => $this->authtype . " " . $this->authtoken,
//                 "User-Agent" => "DiscordSDK (https://github.com/cubiclesoft/php-discord-sdk, 1.0)"
//             )
//         );

//         if ($method === "POST" || $method === "PUT")
//         {
//             $options2["headers"]["Content-Type"] = "application/json";
//             $options2["body"] = json_encode($postvars, JSON_UNESCAPED_SLASHES);

//             foreach ($options as $key => $val)
//             {
//                 if (isset($options2[$key]) && is_array($options2[$key]))  $options2[$key] = array_merge($options2[$key], $val);
//                 else  $options2[$key] = $val;
//             }
//         }
//         else
//         {
//             $options2 = array_merge($options2, $options);
//         }

//         if (!$result["success"])  return $result;

//         if ($result["response"]["code"] != $expected)  return array(
//             "success" => false,
//             "error" => self::Discord_Translate("Expected a %d response from the Discord API.  Received '%s'.", $expected, $result["response"]["line"]),
//             "errorcode" => "unexpected_discord_api_response",
//             "info" => $result);

//         if ($decodebody)
//         {
//             $data = json_decode($result["body"], true);
//             if (!is_array($data))  return array(
//                 "success" => false,
//                 "error" => self::Discord_Translate("Unable to decode the server response as JSON."),
//                 "errorcode" => "expected_json",
//                 "info" => $result
//             );

//             $result = array(
//                 "success" => true,
//                 "data" => $data
//             );
//         }

//         return $result;
//     }
// }
