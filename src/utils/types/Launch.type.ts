export type Launch = {
  [key: string]: any;
  links: {
    mission_patch_small: string;
    reddit_media: string;
    wikipedia: string;
    video_link: string;
  };
  launch_site: {
    site_name: string;
  };
  rocket: {
    rocket_name: string;
    second_stage: {
      payloads: [
        {
          nationality: string;
        }
      ];
    };
  };
  launch_date_utc: string;
  mission_name: string;
  upcoming: boolean;
};
