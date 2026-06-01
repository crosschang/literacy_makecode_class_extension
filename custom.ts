/**
 * Custom blocks
 */

//% weight=100 color=#0fbc11 icon="\uf2bb" block="검사할문장리스트"
namespace CheckList {

    player.execute("function quiz/class2/testing")

    let 검사문장모음: string[] = []

    검사문장모음 = [
        "나는 초등학생 3학년이야",
        "나는 마인초등학교에 다니고 있어",
        "오늘은 개인정보 보호를 배울 수 있어서 좋아",
        "오늘 수업은 어렵지만 재미있어",
        "코딩교육과 함께해서 신나",
        "나의 전화번호는 010-9876-1234야",
        "나의 어머니의 이름은 김마리야",
        "나는 케이블아파트 209호에서 살아",
        "나만의 채팅명령어를 쓸 수 있는 것은 신기해",
        "내 이메일은 crafting@minecraft.com 이야",
        "아버지의 번호는 010-2310-2313이야",
        "내 집의 위치는 숲주민마을이고 주소는 숲주민마을길 137-5야",
        "선생님이 오늘 알려주는 코딩은 나한테 도움이 되",
        "문장들을 번호대로 나누니까 좋아보여"
    ]
    /**
     * 검사할 문장 개수를 가져옵니다.
     */
    //% blockId=GetCheckList_len block="검사할 문장 개수"
    export function GetCheckList_Length(): number {
        return 검사문장모음.length;
    }

    /**
     * 입력한 숫자에 맞는 검사문장을 가져옵니다.
     * @param 번호 문장 번호, eg: 1
     */
    //% blockId=GetCheckList_sen block="$num 의 문장 가져오기"
    export function GetCheckList_Sentence(num: number): string {
        if (num < 1 || num > 검사문장모음.length) {
            return ""
        }
        return 검사문장모음[num - 1]
    }
}

let answer: number = 0, value: number = 0, blocktype = GOLD_BLOCK
let player_number: number = 0, x: number = 0, z: number = 0

interface PlayerData {
    readonly tagname: string;
    readonly player_number: number;
    readonly x: number;
    readonly z: number;
}

let players: PlayerData[] = [
    {
        tagname: "examination_1",
        player_number: 1,
        x: -26,
        z: -9
    },
    {
        tagname: "examination_2",
        player_number: 2,
        x: -26,
        z: -5
    },
    {
        tagname: "examination_3",
        player_number: 3,
        x: -26,
        z: -1
    },
    {
        tagname: "examination_4",
        player_number: 4,
        x: -26,
        z: 3
    },
    {
        tagname: "examination_5",
        player_number: 5,
        x: -26,
        z: 7
    },
    {
        tagname: "examination_6",
        player_number: 6,
        x: -26,
        z: 11
    },
    {
        tagname: "examination_7",
        player_number: 7,
        x: -26,
        z: 15
    },
    {
        tagname: "examination_8",
        player_number: 8,
        x: -34,
        z: -9
    },
    {
        tagname: "examination_9",
        player_number: 9,
        x: -34,
        z: -5
    },
    {
        tagname: "examination_10",
        player_number: 10,
        x: -34,
        z: -1
    },
    {
        tagname: "examination_11",
        player_number: 11,
        x: -34,
        z: 3
    },
    {
        tagname: "examination_12",
        player_number: 12,
        x: -34,
        z: 7
    },
    {
        tagname: "examination_13",
        player_number: 13,
        x: -34,
        z: 11
    },
    {
        tagname: "examination_14",
        player_number: 14,
        x: -34,
        z: 15
    },
    {
        tagname: "examination_15",
        player_number: 15,
        x: -30,
        z: 19
    },
]


function loadPlayerData(playerTable: PlayerData[]): boolean {
    for (let k = 0; k < playerTable.length; k++) {
        let data = playerTable[k]

        if (player.execute("testfor @s[tag=" + data.tagname + "]")) {
            player_number = data.player_number
            x = data.x
            z = data.z

            return true
        }
    }

    player.say("§c앗! 지정된 플레이어를 찾지못했습니다.")
    return false
}

function classification_test(): void {
    //player.say("정답 : " + answer)
    //player.say("값 : " + value)
    //player.say("플레이어 넘버 : " + player_number)
    //player.say("x좌표 : " + x)
    //player.say("z좌표 : " + z)
    //player.say("블록 타입 : " + blocktype)
    if (blocks.testForBlock(blocktype, world(x, 2, z))) {
        if (value == answer) {
            player.execute(
                "dialogue " + "open " + "@e" + "[tag=computer" + player_number + ",tag=npc_day5] " + "@p" + "[tag=examination_" + player_number + "] " + "\"class5.answer.classification" + answer + "\""
            )
            player.execute(
                "scoreboard " + "players " + "add " + "@p" + "[tag=examination_" + player_number + "] " + "score " + "1"
            )
            blocks.place(AIR, world(x, 2, z))
        } else {
            player.execute(
                "tag " + "@p" + "[tag=examination_" + player_number + "] " + "add " + "classification"
            )
            player.execute(
                "execute " + "@p" + "[tag=examination_" + player_number + "] " + "~ ~ ~ " + "function quiz/penalty"
            )
            blocks.place(AIR, world(x, 2, z))
        }
    }
}

/**
 * Custom blocks
 */
//% weight=100 color=#7B61FF block="정보 분류" icon="\uf002"
namespace classification {

    loadPlayerData(players)
    player.execute("function quiz/class5/testing")

    //% blockId=classification5_5 block="📢 : 광고/출처 모름"
    export function data5_5(): void {
        blocktype = DIAMOND_BLOCK
        value = 5
        answer = 5
    }
    //% blockId=classification5_4 block="💬 : 개인 의견"
    export function data5_4(): void {
        blocktype = DIAMOND_BLOCK
        value = 4
        answer = 5
    }
    //% blockId=classification5_3 block="📰 : 뉴스/책 자료"
    export function data5_3(): void {
        blocktype = DIAMOND_BLOCK
        value = 3
        answer = 5
    }
    //% blockId=classification5_2 block="👩‍🏫 : 전문가 자료"
    export function data5_2(): void {
        blocktype = DIAMOND_BLOCK
        value = 2
        answer = 5
    }
    //% blockId=classification5_1 block="🏛 : 공식 자료"
    export function data5_1(): void {
        blocktype = DIAMOND_BLOCK
        value = 1
        answer = 5
    }
    //% blockId=classification5 block="5번 문제"
    export function Q5(): void {
    }

    //% blockId=classification4_5 block="📢 : 광고/출처 모름"
    export function data4_5(): void {
        blocktype = EMERALD_BLOCK
        value = 5
        answer = 4
    }
    //% blockId=classification4_4 block="💬 : 개인 의견"
    export function data4_4(): void {
        blocktype = EMERALD_BLOCK
        value = 4
        answer = 4
    }
    //% blockId=classification4_3 block="📰 : 뉴스/책 자료"
    export function data4_3(): void {
        blocktype = EMERALD_BLOCK
        value = 3
        answer = 4
    }
    //% blockId=classification4_2 block="👩‍🏫 : 전문가 자료"
    export function data4_2(): void {
        blocktype = EMERALD_BLOCK
        value = 2
        answer = 4
    }
    //% blockId=classification4_1 block="🏛 : 공식 자료"
    export function data4_1(): void {
        blocktype = EMERALD_BLOCK
        value = 1
        answer = 4
    }
    //% blockId=classification4 block="4번 문제"
    export function Q4(): void {
    }

    //% blockId=classification3_5 block="📢 : 광고/출처 모름"
    export function data3_5(): void {
        blocktype = LAPIS_LAZULI_BLOCK
        value = 5
        answer = 3
    }
    //% blockId=classification3_4 block="💬 : 개인 의견"
    export function data3_4(): void {
        blocktype = LAPIS_LAZULI_BLOCK
        value = 4
        answer = 3
    }
    //% blockId=classification3_3 block="📰 : 뉴스/책 자료"
    export function data3_3(): void {
        blocktype = LAPIS_LAZULI_BLOCK
        value = 3
        answer = 3
    }
    //% blockId=classification3_2 block="👩‍🏫 : 전문가 자료"
    export function data3_2(): void {
        blocktype = LAPIS_LAZULI_BLOCK
        value = 2
        answer = 3
    }
    //% blockId=classification3_1 block="🏛 : 공식 자료"
    export function data3_1(): void {
        blocktype = LAPIS_LAZULI_BLOCK
        value = 1
        answer = 3
    }
    //% blockId=classification3 block="3번 문제"
    export function Q3(): void {
    }

    //% blockId=classification2_5 block="📢 : 광고/출처 모름"
    export function data2_5(): void {
        blocktype = IRON_BLOCK
        value = 5
        answer = 2
    }
    //% blockId=classification2_4 block="💬 : 개인 의견"
    export function data2_4(): void {
        blocktype = IRON_BLOCK
        value = 4
        answer = 2
    }
    //% blockId=classification2_3 block="📰 : 뉴스/책 자료"
    export function data2_3(): void {
        blocktype = IRON_BLOCK
        value = 3
        answer = 2
    }
    //% blockId=classification2_2 block="👩‍🏫 : 전문가 자료"
    export function data2_2(): void {
        blocktype = IRON_BLOCK
        value = 2
        answer = 2
    }
    //% blockId=classification2_1 block="🏛 : 공식 자료"
    export function data2_1(): void {
        blocktype = IRON_BLOCK
        value = 1
        answer = 2
    }
    //% blockId=classification2 block="2번 문제"
    export function Q2(): void {
    }

    //% blockId=classification1_5 block="📢 : 광고/출처 모름"
    export function data1_5(): void {
        blocktype = GOLD_BLOCK
        value = 5
        answer = 1
    }
    //% blockId=classification1_4 block="💬 : 개인 의견"
    export function data1_4(): void {
        blocktype = GOLD_BLOCK
        value = 4
        answer = 1
    }
    //% blockId=classification1_3 block="📰 : 뉴스/책 자료"
    export function data1_3(): void {
        blocktype = GOLD_BLOCK
        value = 3
        answer = 1
    }
    //% blockId=classification1_2 block="👩‍🏫 : 전문가 자료"
    export function data1_2(): void {
        blocktype = GOLD_BLOCK
        value = 2
        answer = 1
    }
    //% blockId=classification1_1 block="🏛 : 공식 자료"
    export function data1_1(): void {
        blocktype = GOLD_BLOCK
        value = 1
        answer = 1
    }
    //% blockId=classification1 block="1번 문제"
    export function Q1(): void {
    }

    //% blockId=classification_answer block="이 정보의 종류는?"
    export function classification(handler: () => void): void {
        let delay: number = 500

        handler()
        loops.forever(function () {
            loops.pause(delay)
            classification_test()
        })
    }

}

enum RoomNumber {
    //% block="1번"
    One = 1,
    //% block="2번"
    Two = 2,
    //% block="3번"
    Three = 3,
    //% block="4번"
    Four = 4,
    //% block="5번"
    Five = 5,
    //% block="6번"
    Six = 5
}

enum Roomtype {
    //% block="수업"
    Class = 1,
    //% block="시험"
    Examination = 2
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf0ad" block="교사용 컨트롤 시스탬"
namespace custom {
    let class_number = ""
    //%blockId=task block="어떤 작업을 시행 하실건가요? "
    export function task(handler: () => void): void {
        handler()
    }
    /**
    * 맵의 동작을 초기화 합니다.
    */
    //%blockId=initialization block="초기화"
    export function initialization(): void {
        player.execute("function admin/I")
    }
    /**
    * 맵의 모든 것들을 초기화 합니다./r/n
    * (맵에 심각한 문제가 발생시에만 시행)
    */
    //%blockId=factory_initialization block="공장 초기화"
    export function factory_initialization(): void {
        player.execute("function admin/FI")
    }
    /**
     * 특정방의 문을 개방합니다.
     */
    //%handlerStatement=0
    //%blockId=opendoor_class block="$n째 날 $r방 개방"
    export function opendoor_class(n: RoomNumber, r: Roomtype): void {
        if ((n == 1 && r != 2) || (n == 6 && r != 1)){
            let s = "day" + n + (r == Roomtype.Class ? "_class" : "_examination")
            player.execute("tag " + "@s" + "[tag=map_admin] " + "add " + s)
            player.execute("tag " + "@s" + " [tag=map_admin] " + "add " + "door_open")
        }else{
            player.say('§e이런! 해당 방은 존재하지 않습니다!')
        }
    }
}
