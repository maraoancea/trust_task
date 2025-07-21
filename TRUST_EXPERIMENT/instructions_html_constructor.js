/* this script will generate the instructions text */
function create_instructions_html() {

    page_1_html = get_page_1()
    page_2_html = get_page_2()
    page_3_html = get_page_3()
    page_5_html = get_page_5()

    return [page_1_html,
            page_2_html,
            page_3_html,
            page_5_html]
}