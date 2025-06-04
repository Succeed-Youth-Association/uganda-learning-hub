
declare module 'mammoth' {
  interface ConvertToHtmlOptions {
    arrayBuffer: ArrayBuffer;
  }

  interface ConvertToHtmlResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export function convertToHtml(options: ConvertToHtmlOptions): Promise<ConvertToHtmlResult>;
}
