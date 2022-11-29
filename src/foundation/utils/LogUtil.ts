const LOG_LEVEL = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

const logLevel = LOG_LEVEL.DEBUG;
export default class LogUtil {
  /**
   * 参考：https://juejin.cn/post/6844903975209140238
   */
  static log(
    {tag = ''}: {tag?: string},
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (logLevel <= LOG_LEVEL.INFO) {
      let prefix: string = tag !== '' ? '[' + tag + ']:' : tag;
      console.log(prefix + message, ...optionalParams);
    }
  }

  static debug(
    {tag = ''}: {tag?: string},
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (logLevel <= LOG_LEVEL.DEBUG) {
      let prefix: string = tag !== '' ? '[' + tag + ']:' : tag;
      console.debug(prefix + message, ...optionalParams);
    }
  }

  static info(
    {tag = ''}: {tag?: string},
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (logLevel <= LOG_LEVEL.INFO) {
      let prefix: string = tag !== '' ? '[' + tag + ']:' : tag;
      console.info(prefix + message, ...optionalParams);
    }
  }

  static warn(
    {tag = ''}: {tag?: string},
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (logLevel <= LOG_LEVEL.WARN) {
      let prefix: string = tag !== '' ? '[' + tag + ']:' : tag;
      console.warn(prefix + message, ...optionalParams);
    }
  }

  static error(
    {tag = ''}: {tag?: string},
    message?: any,
    ...optionalParams: any[]
  ): void {
    if (logLevel <= LOG_LEVEL.ERROR) {
      let prefix: string = tag !== '' ? '[' + tag + ']:' : tag;
      console.error(prefix + message, ...optionalParams);
    }
  }
}
