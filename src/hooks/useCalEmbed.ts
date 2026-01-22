import { getCalApi } from "@calcom/embed-react";
import type { BookerLayouts } from "@calcom/embed-core/dist/src/types";
import { useEffect } from "react";

interface CalEmbedOptions {
  namespace: string;
  styles?: {
    branding?: {
      brandColor?: string;
    };
  };
  hideEventTypeDetails?: boolean;
  layout?: BookerLayouts;
}

export const useCalEmbed = (options: CalEmbedOptions) => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: options.namespace });
      cal("ui", {
        styles: options.styles,
        hideEventTypeDetails: options.hideEventTypeDetails,
        layout: options.layout,
      });
    })();
  }, [options]);

  return {
    namespace: options.namespace,
    layout: options.layout,
  };
};
