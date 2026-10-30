pstudio_rigs = ["panoptic_1_4_7_11", "panoptic_1_7_14_20", "panoptic_27_16_14_8"]

config = {
    "type": "EvalDataset",
    "root": "data/eval/mvtracker",
    "subsets": ["kubric", "dexycb", *pstudio_rigs],
    "groups": {"pstudio": pstudio_rigs},
    "max_frames": 24,
    "max_side": 504,
}
